import fs from 'fs';
import {join} from "path";
import {fileURLToPath} from "url";

const errorText = "\nReadable Stream Read Error";
const file = "fileToRead.txt";
const folder = "files";
const filePath = join(fileURLToPath(import.meta.url), "..", folder, file);

const read = async () => {
  const readableStream = fs.createReadStream(filePath);

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on("error", (err) => {
    console.error(errorText, err.message);
  });
};

await read();
