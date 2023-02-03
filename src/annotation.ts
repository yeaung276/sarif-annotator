import {context, getOctokit} from '@actions/github';
import * as core from '@actions/core';
import { Message, Result } from 'sarif';

export type AnnotationLevel = 'notice' | 'warning' | 'failure';

type Annotation = {
    path: string
    start_line: number
    end_line: number,
    start_column: number,
    end_column: number,
    annotation_level: AnnotationLevel,
    message: string,
    title: string
}

export async function publishAnnotation(toolName: string, annotations: Annotation[]){
  if(annotations.length === 0){
    core.info(`no annotation found, skipping ${toolName}`)
    return
  }
  core.info(`publishing output for ${toolName}`)
  const token = core.getInput('token')
  const octokit = getOctokit(token)
  let sha = context.sha
  if (context.payload.pull_request) {
    sha = context.payload.pull_request.head.sha
  }
  const request = {
    ...context.repo,
    ref: sha
  }

  const result = await octokit.rest.checks.listForRef(request)
  const exists = result.data.check_runs.find(check => check.name === context.workflow)
  const accept = 'application/vnd.github.v3+json'
  if (exists) {
    core.info('check exists, reusing...')
    const id = exists.id
    await octokit.rest.checks.update({
      ...context.repo,
      accept,
      conclusion: 'success',
      check_run_id: id,
      status: 'completed',
      output: {
          title: toolName,
          summary: `${annotations.length} issue(s) found.`,
          text: `${annotations.length} issue(s) found.`,
          annotations,
      }
    })
  } else {
    core.info('check does not exist, creating new...')
    const createRequest = {
      ...context.repo,
      accept,
      head_sha: sha,
      conclusion: 'success',
      name: context.workflow,
      status: 'completed',
      output: {
          title: toolName,
          summary: `${annotations.length} issue(s) found.`,
          text: `${annotations.length} issue(s) found.`,
          annotations,
      }
    }
    await octokit.rest.checks.create(createRequest)
  }
}

function convertAnotationLevel(l: string | undefined): AnnotationLevel {
    switch (l) {
      case 'error':
        return 'failure'
        break
      case 'note':
        return 'notice'
      default:
        return l as AnnotationLevel
    }
  }

export function getAnnotationsFromSarifResult(results: Result[]): Annotation[]{
    return results.map((result) => {
        /*
         * Assume that locations will contain zero or one element.
         * 3.27.12 locations property
         * https://docs.oasis-open.org/sarif/sarif/v2.0/csprd02/sarif-v2.0-csprd02.html#_Toc10127841
         */
        const location = result.locations?.[0].physicalLocation ?? {}
        return {
            path: matchFilePath(location.artifactLocation?.uri || ''),
            start_line: location.region?.startLine ?? 0,
            end_line: location.region?.endLine ?? 0,
            start_column: location.region?.startColumn ?? 0,
            end_column: location.region?.endColumn ?? 0,
            annotation_level: convertAnotationLevel(result.level),
            message: stringFromMessage(result.message),
            title: result.ruleId ?? 'Unspecified'
        }
    })
}

export function matchFilePath(path: string){
    return new RegExp('(?<=file:\/\/).*$').exec(path)?.[0] ?? path
}

const regex = RegExp(/<\/?\w+>/g)

function stringFromMessage(message: Message): string {
  const text = message.text ?? message.markdown ?? ''
  return text.replace(regex, `'`)
}