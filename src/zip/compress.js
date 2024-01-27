import fs from 'fs';
import zlib from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';

const inputFile = 'fileToCompress.txt';
const outputFile = 'archive.gz';
const folder = 'files';
const baseDir = join(fileURLToPath(import.meta.url), '..', folder);
const inputFilePath = join(baseDir, inputFile);
const outputFilePath = join(baseDir, outputFile);
const errorText = 'Compression failed:';
const successText = `File "${inputFile}" compressed to "${outputFile}"`;

const compress = () => {
  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gzipStream = zlib.createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(successText);
  });

  writeStream.on('error', (error) => {
    console.error(errorText, error);
  });
};

compress();
