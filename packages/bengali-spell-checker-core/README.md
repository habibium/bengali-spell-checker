# @bengali-spell-checker/core

Core Bengali spell checker library. This package provides the fundamental spell checking functionality for Bengali/Bangla text.

## Features

- Bengali word spell checking
- Dictionary-based correction suggestions
- Support for Hunspell dictionaries
- Lightweight and fast
- TypeScript support

## Installation

```bash
npm install @bengali-spell-checker/core
# or
pnpm add @bengali-spell-checker/core
# or
yarn add @bengali-spell-checker/core
```

## Usage

```typescript
import { BengaliSpellChecker } from '@bengali-spell-checker/core';

const spellChecker = new BengaliSpellChecker();
const isCorrect = spellChecker.check('বাংলা');
const suggestions = spellChecker.suggest('বাংল');
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Development mode
pnpm dev
```
