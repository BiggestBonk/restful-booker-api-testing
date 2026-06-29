# Restful-Booker API Testing

An automated API test suite covering all of the available endpoints of the [Restful-Booker API](https://restful-booker.herokuapp.com).

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions

## Test Coverage
Tests cover the full range of API operations available on the site, including authentication, booking creation, retrieval, updating, and deletion.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
clone the repository and install dependencies:
```bash
git clone https://github.com/biggestbonk/restful-booker-api-testing
npm install
npx playwright install chromium
```

### Environment Variables

PS: In order to make this suite feel more accurate to a real world project, the environment variables have been kept as secrets in the main project. 

In order for it to run locally, create a `.env` file in the project root with the following values:

BASE_URL=https://restful-booker.herokuapp.com
BOOKER_USERNAME='admin'
BOOKER_PASSWORD='password123'

### Running Tests
```bash
npx playwright test
```