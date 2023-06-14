import fs from 'fs';
import {join} from "path";
import {fileURLToPath} from "url";

const errorText = "\n Readable Stream Write Error";
const finalText = "\n File writing completed.";
const file = "fileToWrite.txt";
const folder = "files";
const filePath = join(fileURLToPath(import.meta.url), "..", folder, file);

const write = async () => {

  const writableStream = fs.createWriteStream(filePath);

  process.stdin.on('data', (chunk) => {
    writableStream.write(chunk);
  });

  process.stdin.on('end', () => {
    writableStream.end();
  });

  writableStream.on('finish', () => {
    console.log(finalText);  //  Ctrl + D - Mac, Ctrl + Z - Win
  });

  writableStream.on('error', (err) => {
    console.error(errorText, err.message);
  });
};

await write();
