import {context, getOctokit} from '@actions/github';
import * as core from '@actions/core';

export async function publishAnnotation(){
    core.info('publishing output')
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
    const exists = result.data.check_runs.find(check => check.name === 'Annotation') // improve 'Annotation'
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
            title: 'title-output',
            summary: 'summary-output',
            text: 'text-output',
            annotations: [
                {
                    path: 'test.js',
                    start_line: 1,
                    end_line: 1,
                    // annotations only support columns in one line
                    start_column: 10,
                    end_column: 14,
                    annotation_level: 'warning',
                    message: "'test' is defined but never used.",
                    title: "@typescript-eslint/no-unused-vars"
                }
            ]
        }
      })
    } else {
      core.info('check does not exist, creating new...')
      const createRequest = {
        ...context.repo,
        accept,
        head_sha: sha,
        conclusion: 'success',
        name: 'Annotation',
        status: 'completed',
        output: {
            title: 'title-output',
            summary: 'summary-output',
            text: 'text-output',
            annotations: [
                {
                    path: 'test.js',
                    start_line: 1,
                    end_line: 1,
                    // annotations only support columns in one line
                    start_column: 10,
                    end_column: 14,
                    annotation_level: 'warning',
                    message: "'test' is defined but never used.",
                    title: "@typescript-eslint/no-unused-vars"
                }
            ]
        }
      }
      await octokit.rest.checks.create(createRequest)
    }
}