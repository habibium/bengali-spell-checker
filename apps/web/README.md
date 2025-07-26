# Bengali Spell Checker Web Application

A modern, interactive web application for checking Bengali spelling using Hunspell dictionary and Typo.js library.

## Features

### 🔤 Spell Checking

- **Real-time spell checking** for Bengali text
- **Visual indicators** for correct (green) and misspelled (red underlined) words
- **Click-to-suggest** functionality for misspelled words
- **Smart word replacement** with suggested corrections

### 📊 Analytics

- **Word count** tracking
- **Error count** with accuracy percentage
- **Unique error tracking** with most common mistakes
- **Real-time statistics** updates

### 🎯 User Experience

- **Interactive demo examples** with pre-loaded Bengali text samples
- **Keyboard shortcuts** for quick actions
  - `Ctrl/Cmd + L`: Load sample text
  - `Ctrl/Cmd + K`: Clear text
- **Copy to clipboard** functionality
- **Responsive design** that works on all devices

### 🎨 Modern UI

- Built with **shadcn/ui** components
- **Tailwind CSS v4** for styling
- **Bengali font support** (Noto Sans Bengali)
- **Beautiful gradient backgrounds**
- **Toast notifications** for user feedback

## Technology Stack

- **Framework**: Next.js 15.4.4 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Spell Checker**: Typo.js with Bengali (bn_BD) Hunspell dictionary
- **Font**: Noto Sans Bengali (Google Fonts)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Navigate to the web application directory:

```bash
cd apps/web
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Usage

### Basic Spell Checking

1. Type or paste Bengali text into the input area
2. Misspelled words will be highlighted with red underlines
3. Click on any misspelled word to see suggestions
4. Select a suggestion to replace the word automatically

### Demo Examples

- Use the demo panel to try pre-loaded Bengali text samples
- Examples include simple text, poetry, academic content, and mixed content
- Each example shows word count, error count, and accuracy percentage

### Keyboard Shortcuts

- **Ctrl/Cmd + L**: Load sample text
- **Ctrl/Cmd + K**: Clear all text

### Features Overview

- **Input Panel**: Type or paste Bengali text
- **Preview Panel**: See highlighted results with spell check
- **Demo Panel**: Try example texts
- **Statistics**: View real-time analytics
- **Help Section**: Learn how to use the application

## Dictionary

This spell checker uses the Bengali (bn_BD) Hunspell dictionary, which provides:

- Comprehensive coverage of modern Bengali words
- Support for Bengali Unicode characters (U+0980-U+09FF)
- Proper handling of Bengali compound characters and conjuncts

## Architecture

### Components

- `SpellChecker`: Main application component
- `SpellCheckDemo`: Demo examples and text loading
- `SpellCheckStats`: Analytics and statistics display
- `HelpSection`: User guidance and instructions
- `HighlightedText`: Text rendering with spell check highlights
- `SuggestionDialog`: Word suggestion modal

### Hooks

- `useSpellChecker`: Core spell checking logic with Typo.js integration

### Key Features

- **Client-side processing**: All spell checking happens in the browser
- **Progressive enhancement**: Works without JavaScript for basic functionality
- **Performance optimized**: Efficient text processing and rendering
- **Accessible**: Keyboard navigation and screen reader support

## Performance

- **Dictionary loading**: ~5-6 seconds initial load time
- **Real-time checking**: Immediate feedback as you type
- **Optimized rendering**: Efficient text highlighting with minimal re-renders
- **Memory efficient**: Smart caching of spell check results

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This application is part of the Bengali Spell Checker monorepo. Please see the main repository README for contribution guidelines.

## License

See the main repository license file for licensing information.

---

**Built with ❤️ for the Bengali language community**
