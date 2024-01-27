import * as url from 'url';
import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { join } from 'path';

const file = 'worker.js';
const pathToFile = join(url.fileURLToPath(new URL('.', import.meta.url)), file);
const cpusAmount = cpus().length;
let startNumber = 10;
const results = [];
const errorText = 'An error occurred during calculation:';
const successText = `Calculation completed successfully. cpus().length = "${cpus().length}"`;

const performCalculations = async () => {
  for (let i = 0; i < cpusAmount; i++) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(pathToFile, { workerData: startNumber++ });

      worker.on('message', (data) => resolve(data));
      worker.on('error', (error) => reject(error));
    });

    try {
      const result = await promise;
      results.push({ status: 'resolved', data: typeof result === 'number' && result });
    } catch (error) {
      results.push({ status: 'error', data: null });
      console.error(errorText, error);
    }
  }
  console.log(successText);
  console.log(results);
};

await performCalculations();
