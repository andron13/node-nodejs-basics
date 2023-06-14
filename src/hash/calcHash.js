import fs from "fs";
import crypto from "crypto";
import {fileURLToPath} from "url";
import {join} from "path";

const errorText = "The SHA256 hash calculating operation failed.";
const file = "fileToCalculateHashFor.txt";
const folder = "files";
const filePath = join(fileURLToPath(import.meta.url), "..", folder, file);

const calculateHash = async () => {
  try {
    const data = await fs.promises.readFile(filePath);
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    console.log(hash);
  } catch (err) {
    console.error(errorText, err);
  }
};

await calculateHash();