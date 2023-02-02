import * as core from '@actions/core';
import fs from 'fs/promises';
import { Log } from 'sarif';

const config = {
    path: "./megalinter-report.sarif",
    include: ['ESLint'],
    exclude: null as null | string[],
}

async function readFile(): Promise<Log | undefined>{
    try {
        const data = await fs.readFile(config.path, { encoding: 'utf8' });
        return JSON.parse(data)
      } catch (err) {
        core.error('File not found in workspace')
        console.log(err)
        core.setFailed('File not found')
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

function annotate(report: Log['runs'][0]){
    if(includeInReports(report.tool.driver.name)){
        console.log(report)
    }
    
}

async function run(){
    const result = await readFile();
    if(result){
        result.runs.forEach(annotate)
    }
}

run()