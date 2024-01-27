import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const errorText = 'FS operation failed';
const file = 'fileToRead.txt';
const folder = 'files';
const filePath = join(fileURLToPath(import.meta.url), '..', folder, file);

const read = async () => {
  let content = '';
  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK);
    content = await fsPromises.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(errorText);
  }
  console.log(content);
};

await read();
