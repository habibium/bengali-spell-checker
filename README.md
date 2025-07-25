# Bengali Spell Checker

A comprehensive Bengali/Bangla spell checker solution - fully open source.

This monorepo contains multiple packages and applications for Bengali spell checking across different platforms and use cases.

## 📦 Packages

### Core Library

- **[@bengali-spell-checker/core](./packages/bengali-spell-checker-core)** - Core Bengali spell checker library

## 🚀 Applications

### Desktop & Editors

- **[VSCode Extension](./apps/vscode-extension)** - Bengali spell checker extension for Visual Studio Code

### Web & API

- **[Web App](./apps/web)** - Interactive web application for Bengali spell checking
- **[API](./apps/api)** - REST API for Bengali spell checking services

## 🛠️ Development

This project uses [pnpm](https://pnpm.io/) for package management and workspace organization.

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/habibium/bengali-spell-checker.git
cd bengali-spell-checker

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development for all apps
pnpm dev
```

### Workspace Commands

```bash
# Install dependencies for all packages
pnpm install

# Build all packages and apps
pnpm build

# Run development mode for all apps
pnpm dev

# Run tests across all packages
pnpm test

# Lint all packages
pnpm lint

# Clean build artifacts
pnpm clean
```

## 📊 Benchmarks

Performance comparisons with different spell checking implementations:

### 1. nspell

| Bundle size | t1  | t2  | t3  | t4  | t5  |
| ----------- | --- | --- | --- | --- | --- |

### 2. hunspell-asm

| Bundle size | t1  | t2  | t3  | t4  | t5  |
| ----------- | --- | --- | --- | --- | --- |

### 3. hunspell-wasm

| Bundle size | t1   | t2   | t3   | t4   | t5   |
| ----------- | ---- | ---- | ---- | ---- | ---- |
| 1.2 MB      | 0.5s | 0.6s | 0.7s | 0.8s | 0.9s |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the GNU General Public License Version 3 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [BanglaTypeFoundry](https://banglatypefoundry.com/)
- [Hunspell project](https://hunspell.github.io/)
