const core = require('@actions/core');
const fs = require('fs/promises');

const config = {
    path: "megalinter-report.sarif",
    include: ['ESLint'],
    exclude: null,
}

async function readFile(){
    try {
        const data = await fs.readFile(config.path, { encoding: 'utf8' });
        return JSON.parse(data)
      } catch (err) {
        core.error('File not found in workspace')
        return {}
      }
}

function normalizeName(name){
    return name.split(' ')[0]
}

function includeInReports(toolName){
    const name = normalizeName(toolName)
    if(config.include){
        return config.include.includes(name)
    } else if(config.exclude){
        return !config.exclude.include(name)
    }
    return true
}

function annotate(report){
    if(includeInReports(report.tool.driver.name)){
        console.log(report)
    }
    
}

async function run(){
    const result = await readFile();
    result.runs.forEach(annotate)
}

run()