import fs from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const errorText = 'FS operation failed';
const folderName = 'files';
const folderPath = join(fileURLToPath(import.meta.url), '..', folderName);

const list = async () => {
  try {
    await fs.promises.access(folderPath, fs.constants.F_OK);
    const files = await fs.promises.readdir(folderPath);
    files.forEach((file) => console.log(file));
  } catch (err) {
    throw new Error(errorText);
  }
};

await list();
