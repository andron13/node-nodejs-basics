import {promises as fsPromises} from 'fs';
import path, {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {release, version} from 'os';
import {createServer as createServerHttp} from 'http';

import './files/c.js';

const readFile = async ( pathToFile) => {
  const filePath = join(dirname(fileURLToPath(import.meta.url)),  pathToFile);
  const data = await  fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

let unknownObject;

const random = Math.random();

if (random > 0.5) {
  unknownObject = await readFile("files/a.json");
} else {
  unknownObject = await readFile("files/b.json");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(new URL(import.meta.url).pathname)}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export {
  unknownObject,
  myServer,
};
