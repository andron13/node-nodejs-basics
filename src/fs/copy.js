import * as fs from "fs";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceFolder = join(__dirname, "files");
const targetFolder = join(__dirname, "files_copy");
const errorText = "FS operation failed";

const copy = async () => {
  try {

    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`${errorText}: source folder does not exist`);
    }

    if (fs.existsSync(targetFolder)) {
      throw new Error(`${errorText}: target folder already exists`);
    }

    const entries = await fs.promises.readdir(sourceFolder, { withFileTypes: true });

    await fs.promises.mkdir(targetFolder);
    for (let entry of entries) {
      const srcPath = join(sourceFolder, entry.name);
      const destPath = join(targetFolder, entry.name);

      if (entry.isDirectory()) {
        await fs.promises.mkdir(destPath);
        await copy(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

  } catch (err) {
    throw new Error(`${errorText}: ${err.message}`);
  }
};

await copy();
