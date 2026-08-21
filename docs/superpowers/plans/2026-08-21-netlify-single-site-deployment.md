# Netlify Single-site Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deploy the React frontend and Express backend as one Netlify site with the backend running as a Netlify Function and continuing to forward leads to Make.com.

**Architecture:** Netlify builds `frontend` into `frontend/build` and publishes that directory. The existing Express app is wrapped by `serverless-http` in `backend/netlify/functions/api.js`; Netlify redirects `/api/*` to that function and all other paths to the React SPA entrypoint.

**Tech Stack:** React 19, Create React App, Express 5, Netlify Functions, `serverless-http`, Make.com webhook.

**Spec:** `docs/superpowers/specs/2026-08-21-netlify-single-site-deployment.md`

## Global Constraints

- Preserve the existing lead payload fields: `businessName`, `email`, `phone`, and `language`.
- Keep `Webhook_URL` server-side in Netlify environment variables.
- Preserve `/health` and `/api/leads` Express routes.
- Preserve React Router SPA fallback behavior.

### Task 1: Add Netlify build and redirect configuration

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Write the Netlify configuration**

```toml
[build]
  command = "npm --prefix frontend ci && npm --prefix backend ci && npm --prefix frontend run build"
  publish = "frontend/build"
  functions = "backend/netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Validate the file contents**

Run: `Get-Content -Raw netlify.toml`
Expected: The build, publish, functions, API redirect, and SPA fallback sections are present.

### Task 2: Add the serverless Express function adapter

**Files:**
- Create: `backend/netlify/functions/api.js`
- Modify: `backend/package.json`
- Modify: `backend/package-lock.json`

- [ ] **Step 1: Add the runtime dependency**

Run: `npm.cmd install serverless-http --prefix backend`
Expected: `serverless-http` is added to `backend/package.json` and the lockfile.

- [ ] **Step 2: Create the function entrypoint**

```js
const serverless = require("serverless-http");
const app = require("../../src/server");

module.exports.handler = serverless(app);
```

- [ ] **Step 3: Check the function syntax**

Run: `node --check backend/netlify/functions/api.js`
Expected: Exit code 0.

### Task 3: Use the Netlify-relative API endpoint in the frontend

**Files:**
- Modify: `frontend/src/api/leads.js`

- [ ] **Step 1: Replace the development-only default URL**

Use `process.env.REACT_APP_API_URL` when explicitly configured; otherwise submit to `/api/leads` so Netlify’s redirect reaches the function.

```js
const apiUrl = process.env.REACT_APP_API_URL || "";
const response = await fetch(`${apiUrl}/api/leads`, {
```

- [ ] **Step 2: Preserve JSON response and error handling**

Keep the existing `response.json()` fallback and `data.success` check unchanged.

### Task 4: Verify the integrated deployment behavior

**Files:**
- No additional source files.

- [ ] **Step 1: Install dependencies from the backend package**

Run: `npm.cmd install --prefix backend`
Expected: Installation completes and the lockfile remains consistent.

- [ ] **Step 2: Run frontend tests**

Run: `Set-Location frontend; $env:CI='true'; npm.cmd test -- --watchAll=false; Set-Location ..`
Expected: All frontend tests pass.

- [ ] **Step 3: Build the frontend**

Run: `npm.cmd run build --prefix frontend`
Expected: `frontend/build` is generated successfully.

- [ ] **Step 4: Check backend and function syntax**

Run: `node --check backend/src/server.js; node --check backend/netlify/functions/api.js`
Expected: Both commands exit successfully.

- [ ] **Step 5: Confirm deployment instructions**

Document in the final handoff that Netlify must define `Webhook_URL` under Site configuration → Environment variables, and that the deploy context should be the repository root.
