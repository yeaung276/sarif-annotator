import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github'
import fs from 'fs/promises';
import { Log, Result } from 'sarif';
import { json } from './result';

const config = {
    path: "./yeaung276/sarif-annotator/test/megalinter-report.sarif",
    include: ['ESLint'],
    exclude: null as null | string[],
}

async function readFile(): Promise<Log | undefined>{
    try {
        const data = await fs.readFile(config.path, { encoding: 'utf8' });
        return JSON.parse(data)
    } catch (err) {
        console.log(err)
        return json as Log
    }
}

function normalizeName(name: string){
    return name.split(' ')[0]
}

function includeInReports(toolName: string){
    const name = normalizeName(toolName)
    if(config.include){
        return config.include.includes(name)
    } else if(config.exclude){
        return !config.exclude.includes(name)
    }
    return true
}

async function annotate(report: Log['runs'][0]){
    if(includeInReports(report.tool.driver.name)){
        const token = core.getInput('token')
        console.log(token)
        const octokit = getOctokit(token)
        let sha = context.sha
        if (context.payload.pull_request) {
          sha = context.payload.pull_request.head.sha
        }

        const createRequest = {
        ...context.repo,
        accept: 'application/vnd.github.v3+json',
        head_sha: sha,
        conclusion: 'success',
        name: 'title-test',
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

async function run(){
    const result = await readFile();
    if(result){
        result.runs.forEach(annotate)
    }
}

run()