import fs from 'fs';
import zlib from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';

const inputFile = 'archive.gz';
const outputFile = 'fileToCompress.txt';

const folder = 'files';
const baseDir = join(fileURLToPath(import.meta.url), '..', folder);
const inputFilePath = join(baseDir, inputFile);
const outputFilePath = join(baseDir, outputFile);
const errorText = 'Decompression failed. Error:';
const successText = `Decompression successful. File "${inputFile}" decompressed to "${outputFile}".`;

const decompress = async () => {
  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);

  const unzipStream = zlib.createGunzip();

  inputStream.pipe(unzipStream).pipe(outputStream);

  return new Promise((resolve, reject) => {
    outputStream.on('finish', () => {
      console.log(successText);
      resolve();
    });

    outputStream.on('error', (error) => {
      console.error(errorText, error);
      reject(error);
    });
  });
};

await decompress();
