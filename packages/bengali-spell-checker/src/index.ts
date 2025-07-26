import Hunspell from "hunspell-spellchecker";
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths to dictionary files
const dictionaryPath = join(
  __dirname,
  "../../../dictionaries/bn_BD.Jacob-Thomas.02-08-2022.v0.01"
);
const affPath = join(dictionaryPath, "bn_BD.aff");
const dicPath = join(dictionaryPath, "bn_BD.dic");

console.time("Dictionary");

// Load dictionary files
const affData = await fs.readFile(affPath);
const wordData = await fs.readFile(dicPath);

// Create the dictionary instance
const dictionary = new Hunspell();
const DICT = dictionary.parse({
  aff: affData,
  dic: wordData,
});

dictionary.use(DICT);

console.timeEnd("Dictionary");
console.log({
  __filename,
  __dirname,
});

export default dictionary;
