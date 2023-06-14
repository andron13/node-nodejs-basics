import * as fs from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFolder = join(__dirname, "files");
const targetFolder = join(__dirname, "files_copy");
const errorText = "FS operation failed";

const copy = async () => {
  try {
    await fs.promises.copyFile(sourceFolder, targetFolder);
  } catch (err) {
    throw new Error(errorText);
  }
};

await copy();
