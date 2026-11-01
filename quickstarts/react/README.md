![ThunderID React Quickstart](https://raw.githubusercontent.com/thunder-id/samples/main/.github/assets/banners/quickstarts-react.png)

# ThunderID React Quickstart

A minimal React + Vite application demonstrating ThunderID authentication with OAuth 2.0, PKCE, and JWT support using the `@thunderid/react` SDK.

## Prerequisites

- Node.js 18+
- A ThunderID application

## Setup

1. Copy the environment template:
   ```sh
   cp .env.example .env
   ```

2. Fill in your ThunderID credentials in `.env`:
   ```
   VITE_THUNDERID_CLIENT_ID=<your-client-id>
   VITE_THUNDERID_BASE_URL=https://your-thunderid-instance
   ```

3. Install dependencies and start the dev server:
   ```sh
   npm install
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Sign in through a BFF

By default the app signs in from the browser and keeps its tokens there. To keep them on a server
instead, run it against the [Express BFF](../express-bff), which holds the tokens behind an
`HttpOnly` cookie and handles back-channel logout:

1. Set up and start the BFF as its README describes.
2. Set `VITE_THUNDERID_BFF=true` in this app's `.env`. The client ID and base URL are then not
   needed, since the BFF has them.
3. Run `npm run dev`. The dev server forwards `/api/auth` to the BFF at `http://localhost:3001`,
   or at `BFF_URL` when set.

## Docs

Full SDK reference: [thunderid.dev/docs](https://thunderid.dev/docs)
