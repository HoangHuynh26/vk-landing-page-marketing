# Single-site Netlify deployment

## Goal

Deploy the React frontend and Express backend from one repository as one Netlify site. The frontend is served as a static build, while the backend runs as a Netlify Function and continues forwarding lead submissions to the configured Make.com webhook.

## Design

- Build `frontend` into `frontend/build`.
- Expose the Express app through `backend/netlify/functions/api.js` using `serverless-http`.
- Route `/api/*` requests to the `api` Netlify Function.
- Route all remaining paths to `frontend/build/index.html` for React Router support.
- The frontend submits leads to the relative `/api/leads` endpoint.
- `Webhook_URL` is configured only in Netlify environment variables and is read by the backend function.

## Data flow

1. The browser posts `{ businessName, email, phone, language }` to `/api/leads`.
2. Netlify redirects the request to the `api` function.
3. Express validates the payload and forwards it as JSON to `Webhook_URL`.
4. The function returns the existing success or error response to the browser.

## Verification

- Validate the Netlify configuration and function entrypoint.
- Run frontend tests and production build.
- Run backend syntax checks and a local function/API smoke test where available.
