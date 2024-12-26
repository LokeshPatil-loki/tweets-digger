# tweets-digger

[![npm version](https://img.shields.io/npm/v/tweets-digger.svg)](https://www.npmjs.com/package/tweets-digger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Node.js package to scrape tweets and replies from a user's timeline on X (formerly Twitter).

## Features

- Scrape tweets and replies from any public X profile
- Automated scrolling to load all tweets
- Save extracted data to JSON file
- Supports headless browser operation
- TypeScript support

## Installation

```bash
npm install tweets-digger
```

## Usage

```typescript
import { scrapeTweetsOfUser } from 'tweets-digger';

// Replace with your X auth token
const AUTH_TOKEN = 'your-auth-token-here';

// Replace with the username you want to scrape
const USERNAME = 'example_user';

// Optional: Specify custom Chrome/Chromium executable path
const CHROME_PATH = '/usr/bin/chromium';

async function main() {
  try {
    await scrapeTweetsOfUser(USERNAME, AUTH_TOKEN, CHROME_PATH);
    console.log('Scraping completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## API Reference

### scrapeTweetsOfUser(username, auth_token, executablePath?)

Scrapes tweets and replies from a user's timeline.

#### Parameters

- `username` (string): The X username to scrape tweets from
- `auth_token` (string): Your X authentication token
- `executablePath` (string, optional): Path to Chrome/Chromium executable. Defaults to '/usr/bin/chromium'

#### Returns

- Promise<void>: Resolves when scraping is complete. The scraped data is saved to 'data.json' in the current directory.

## Getting Your Auth Token

1. Log in to X (Twitter) in your browser
2. Open Developer Tools (F12)
3. Go to Application > Cookies
4. Find the 'auth_token' cookie value
5. Copy this value to use with the package

## Requirements

- Node.js 14 or higher
- Chrome or Chromium browser installed

## Dependencies

- puppeteer: For browser automation
- TypeScript support included

## Contributing

We welcome contributions to tweets-digger! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run the build to ensure everything works (`npm run build`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/tweets-digger.git
   cd tweets-digger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Code Style

- Write clean, readable TypeScript code
- Follow existing code formatting patterns
- Add appropriate comments for complex logic
- Update tests if necessary
- Update documentation for any new features

## License

MIT © [lokihammer](https://github.com/LokeshPatil-loki)
