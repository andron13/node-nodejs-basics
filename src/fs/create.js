import {Buffer} from 'node:buffer';
import fs from "fs";
import url from "url";

const successText = "I am fresh and young";
const data = new Uint8Array(Buffer.from(successText));
const errorText = "FS operation failed"
const file = "fresh.txt";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const pathToFile = __dirname + "/files/" + file;

const create = async () => {
  try {
    await fs.promises.writeFile(pathToFile, data, {
      flag: 'wx'
    });
  } catch (err) {
    throw new Error(errorText)
  }
};

await create();
