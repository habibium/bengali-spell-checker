# Contributing to Bengali Spell Checker

Thank you for your interest in contributing to the Bengali Spell Checker project! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Setup Development Environment

1. Fork and clone the repository:

```bash
git clone https://github.com/your-username/bengali-spell-checker.git
cd bengali-spell-checker
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

4. Start development:

```bash
pnpm dev
```

## 📁 Project Structure

```
bengali-spell-checker/
├── packages/
│   └── bengali-spell-checker-core/    # Core spell checker library
├── apps/
│   ├── vscode-extension/              # VS Code extension
│   ├── api/                          # REST API
│   └── web/                          # Web application
├── dictionaries/                     # Bengali dictionaries
└── docs/                            # Documentation
```

## 🔧 Development Workflow

### Working on the Core Library

```bash
cd packages/bengali-spell-checker-core
pnpm dev
```

### Working on Applications

```bash
# VS Code Extension
cd apps/vscode-extension
pnpm dev

# Web App
cd apps/web
pnpm dev

# API
cd apps/api
pnpm dev
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
cd packages/bengali-spell-checker-core
pnpm test
```

## 📝 Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Run linting before committing: `pnpm lint`
- Write tests for new features
- Update documentation for API changes

## 🐛 Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, etc.)
- Screenshots if applicable

## 💡 Feature Requests

We welcome feature requests! Please:

- Check existing issues first
- Provide clear use cases
- Explain the expected behavior
- Consider implementation complexity

## 🔀 Pull Request Process

1. Create a feature branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test thoroughly
3. Update documentation if needed
4. Run tests and linting:

```bash
pnpm test
pnpm lint
```

5. Commit your changes with a clear message:

```bash
git commit -m "feat: add new spell checking feature"
```

6. Push to your fork and create a pull request
7. Fill out the pull request template completely

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or updates
- `chore:` - Maintenance tasks

## 📚 Resources

- [Bengali Language Resources](https://en.wikipedia.org/wiki/Bengali_language)
- [Hunspell Dictionary Format](https://github.com/hunspell/hunspell)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Community

- Discussions: Use GitHub Discussions for questions and ideas
- Issues: Use GitHub Issues for bugs and feature requests
- Code Reviews: All contributions go through code review

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to make Bengali spell checking better for everyone! 🎉
