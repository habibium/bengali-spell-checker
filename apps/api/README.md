# Bengali Spell Checker API

A REST API that provides Bengali spell checking capabilities via HTTP endpoints.

## Features

- Check spelling of Bengali words
- Get spelling suggestions for misspelled words
- Batch spell checking for multiple words
- RESTful API design
- CORS support
- Security headers with Helmet

## Endpoints

### POST /api/check
Check if a word is spelled correctly.

```json
{
  "word": "বাংলা"
}
```

Response:
```json
{
  "word": "বাংলা",
  "isCorrect": true
}
```

### POST /api/suggest
Get spelling suggestions for a word.

```json
{
  "word": "বাংল"
}
```

Response:
```json
{
  "word": "বাংল",
  "suggestions": ["বাংলা", "বাংলো"]
}
```

### POST /api/check-batch
Check multiple words at once.

```json
{
  "words": ["বাংলা", "বাংল"]
}
```

Response:
```json
{
  "results": [
    {
      "word": "বাংলা",
      "isCorrect": true
    },
    {
      "word": "বাংল",
      "isCorrect": false,
      "suggestions": ["বাংলা", "বাংলো"]
    }
  ]
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Docker

```bash
# Build Docker image
docker build -t bengali-spell-checker-api .

# Run container
docker run -p 3000:3000 bengali-spell-checker-api
```

## License

MIT
