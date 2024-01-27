import fs from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const errorText = 'FS operation failed';
const file = 'fileToRemove.txt';
const folder = 'files';
const pathToFile = join(fileURLToPath(import.meta.url), '..', folder, file);

const remove = async () => {
  try {
    await fs.promises.access(pathToFile, fs.constants.F_OK);
    await fs.promises.unlink(pathToFile);
  } catch (err) {
    throw new Error(errorText);
  }
};

await remove();
