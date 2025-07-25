import Typo from "typo-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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

// Load dictionary files
const affData = readFileSync(affPath, "utf-8");
const wordData = readFileSync(dicPath, "utf-8");

// Create the dictionary instance
const dictionary = new Typo("bn_BD", affData, wordData);

// Export spell checker functions
export function check(word: string): boolean {
  return dictionary.check(word);
}

export function suggest(word: string): string[] {
  return dictionary.suggest(word);
}

export function isLoaded(): boolean {
  return dictionary.loaded;
}

// Export the dictionary instance for advanced usage
export { dictionary };

// Default export with all functions
export default {
  check,
  suggest,
  isLoaded,
  dictionary,
};
