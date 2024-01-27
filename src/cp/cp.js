import { join } from 'path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'url';

const { stdin, stdout } = process;
const file = 'script.js';
const folder = 'files';
const pathToFile = join(fileURLToPath(new URL('.', import.meta.url)), folder, file);
const successText = 'Child process executed successfully.';
const errorText = 'An error occurred in the child process:';

const spawnChildProcess = async (args) => {
  const child = spawn('node', [pathToFile, ...args]);

  child.stdout.pipe(stdout);
  stdin.pipe(child.stdin);

  child.on('close', (code) => {
    if (code === 0) {
      console.log(successText);
    } else {
      console.error(`Child process failed with exit code ${code}.`);
    }
  });

  child.on('error', (error) => {
    console.error(errorText, error);
  });
};

spawnChildProcess([1, 2, 3]);
