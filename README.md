# User Directory

Angular application for managing and viewing user profiles with search functionality.

## Installation

Clone the repository:

```bash
git clone https://github.com/laradev02/user-directory800.git
cd user-directory800
```

## Quick Start

```bash
npm install
npm start
```

Navigate to `http://localhost:4200`

## API Configuration

This project uses a development API key for demonstration purposes. The API key is included in the environment files (`src/environments/environment.ts` and `src/environments/environment.prod.ts`) to ensure the project runs immediately upon setup.

**Note for reviewers:** The API key (`dev_pub_7b28a6a505168e7a1b1186f2c9750ef7`) is a public development key provided for this project demonstration. It is required for API authentication with the reqres.in API.

### Security Note

For production applications, API keys should be:
- Stored in environment variables (not committed to version control)
- Never hardcoded in source files
- Rotated regularly
- Restricted by IP/domain when possible
- Managed through secure secret management systems

This project includes a development key for demonstration purposes only.

## Build

```bash
npm run build
```

## Tech Stack

- Angular 17
- NgRx (Store, Effects, Entity)
- Angular Material
- RxJS
- TypeScript
