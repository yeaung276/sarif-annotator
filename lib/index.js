"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const promises_1 = __importDefault(require("fs/promises"));
const config = {
    path: "megalinter-report.sarif",
    include: ['ESLint'],
    exclude: null,
};
function readFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(config.path, { encoding: 'utf8' });
            return JSON.parse(data);
        }
        catch (err) {
            core.error('File not found in workspace');
            console.log(err);
            core.setFailed('File not found');
        }
    });
}
function normalizeName(name) {
    return name.split(' ')[0];
}
function includeInReports(toolName) {
    const name = normalizeName(toolName);
    if (config.include) {
        return config.include.includes(name);
    }
    else if (config.exclude) {
        return !config.exclude.includes(name);
    }
    return true;
}
function annotate(report) {
    if (includeInReports(report.tool.driver.name)) {
        console.log(report);
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield readFile();
        if (result) {
            result.runs.forEach(annotate);
        }
    });
}
run();
