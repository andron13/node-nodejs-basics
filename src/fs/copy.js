import url from "url";
import fs from "fs";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const sourceFolder = __dirname + "files";
const targetFolder = __dirname + "files_copy"
const errorText = "FS operation failed";

const copy = async () => {
  try {
    await fs.promises.cp(sourceFolder, targetFolder, {
      recursive: true,
      force: false,
      errorOnExist: true
    });
  } catch (err) {
    throw new Error(errorText)
  }

};

await copy();
