import fs from "fs";
import url from "url";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const folder = "/files/"
const oldFileName = __dirname + folder + "wrongFilename";
const newFileName = __dirname + folder + "properFilename";
const errorText = "FS operation failed";
const markdownFormat = ".md";
const textFormat = ".txt"

const rename = async () => {
  try {
    if (fileExist(oldFileName + textFormat) &&
      !fileExist(newFileName + markdownFormat)) {
    }
    await fs.promises.rename(oldFileName + textFormat, newFileName + markdownFormat)
  } catch (err) {
    throw new Error(errorText)
  }


};

await rename();

const fileExist = async (file) => {
  fs.access(file, fs.F_OK, (err) => {
    return !err;
  });
}

//rename.js - implement function that renames file wrongFilename.txt to properFilename with extension .md
// (if there's no file wrongFilename.txt or properFilename.md already exists
// Error with message FS operation failed must be thrown)
