import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github'
import fs from 'fs/promises';
import { Log, Result, Run } from 'sarif';
import { getAnnotationsFromSarifResult, publishAnnotation } from './annotation';
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

async function annotate(report: Run){
    if(includeInReports(report.tool.driver.name)){
        await publishAnnotation(
            report.tool.driver.fullName || report.tool.driver.name, 
            getAnnotationsFromSarifResult(report.results ?? [])
        )
    }
    
}

async function run(){
    const result = await readFile();
    if(result){
        result.runs.forEach(annotate)
    }
}

run()