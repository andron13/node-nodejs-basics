import fs from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

const errorText = "FS operation failed";
const folder = "files";
const oldFileName = "wrongFilename.txt";
const newFileName = "properFilename.md";
const pathToFolder = join(fileURLToPath(import.meta.url), "..", folder);
const pathToOldFile = join(pathToFolder, oldFileName);
const pathToNewFile = join(pathToFolder, newFileName);

const rename = async () => {

  let oldFileExists = true;
  let newFileExists = true;

  try {
    try {
      await fs.promises.access(pathToOldFile, fs.constants.F_OK);
    } catch {
      oldFileExists = false;
    }

    try {
      await fs.promises.access(pathToNewFile, fs.constants.F_OK);
    } catch {
      newFileExists = false;
    }

    if (!oldFileExists || newFileExists){
      return Promise.reject(Error(errorText));
    }

    await fs.promises.rename(pathToOldFile, pathToNewFile);

  } catch (err) {
    throw new Error(errorText);
  }
};

await rename();
