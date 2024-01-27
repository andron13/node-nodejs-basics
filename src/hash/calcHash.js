import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { join } from 'path';

const errorText = 'The SHA256 hash calculating operation failed.';
const hashAlgorithm = 'sha256';
const file = 'fileToCalculateHashFor.txt';
const folder = 'files';
const filePath = join(fileURLToPath(import.meta.url), '..', folder, file);

const calculateHash = async () => {
  const hash = crypto.createHash(hashAlgorithm);
  const data = fs.createReadStream(filePath);

  data.on('error', (err) => {
    process.stderr.write(`${errorText} ${err}\n`);
  });

  data
    .pipe(hash)
    .setEncoding('hex')
    .on('finish', () => {
      process.stdout.write(hash.read().toString('hex') + '\n');
    });
};

await calculateHash();
