import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const successText = 'I am fresh and young';
const data = new Uint8Array(Buffer.from(successText));
const errorText = 'FS operation failed';
const file = 'fresh.txt';
const folder = 'files';
const pathToFile = join(fileURLToPath(import.meta.url), '..', folder, file);

const create = async () => {
  try {
    await fs.promises.writeFile(pathToFile, data, {
      flag: 'wx',
    });
  } catch (err) {
    throw new Error(errorText);
  }
};

await create();
