/* eslint-disable no-console */
import chalk from 'chalk';
import path from 'path';
import { appendFileSync } from 'fs';

const logsPath = path.join(__dirname, '..', '..', 'logs', 'logs.log');
console.clear();

function logger(log: string) {
    if (process.env.ENVIROMENT === 'PRODUCTION') {
        appendFileSync(logsPath, log);
    } else {
        console.log(log);
    }
}

function validate(log: any, logic: Function) {
    if (!log) {
        logger(chalk.red('nullish passed in logger'));
    } else if (typeof log !== 'string') {
        logger(chalk.red('pass string values'));
    } else {
        logger(logic(log));
    }
}

export function info(log: any) {
    validate(log, chalk.blue);
}

export function warning(log: any) {
    validate(log, chalk.yellow);
}

export function error(log: any) {
    validate(log, chalk.red);
}

export function clear() {
    console.clear();
}
