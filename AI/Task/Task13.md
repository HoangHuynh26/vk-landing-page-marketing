TASK13 — NODE.JS BACKEND + API + MAKE

Read ALL AI/*.md before implementation.

First inspect the existing backend.

If Node/Express already exists:
- adapt to the existing architecture.

If backend is missing:
- create the minimum necessary Node.js/Express backend.

Architecture target:

server.js
↓
router
↓
controller
↓
validation
↓
service when necessary
↓
Make integration

Endpoint:

POST /api/leads

Request:
{
  businessName: string,
  phone: string
}

Validation:
- businessName required
- phone required
- phone must contain exactly 10 digits after normalization

Backend validation is mandatory.

Security:
- never trust frontend validation
- sanitize inputs
- rate limit public endpoint where appropriate
- configure CORS
- request body limits
- safe production errors
- no secrets in source code
- use .env
- protect .env through .gitignore

MAKE INTEGRATION

Backend sends lead information to Make.

Make workflow:
1. Receive webhook/API request
2. Save lead to Google Sheets
3. Send email notification
4. Return/process success state

Frontend must NEVER directly expose secret Make webhook credentials.

API response examples:

Success:
{
  "success": true,
  "message": "Lead submitted successfully"
}

Validation:
{
  "success": false,
  "message": "Invalid phone number"
}

Failure:
{
  "success": false,
  "message": "Unable to submit request"
}

Do not expose internal exception details.

Add:
- environment configuration
- error middleware if architecture supports it
- request validation
- logging without sensitive data
- health endpoint if appropriate

Update .gitignore.

Verify:
- API starts
- endpoint responds
- valid data works
- invalid phone rejected
- malformed input rejected
- Make integration is isolated
- frontend can consume the API
- no .env is tracked by Git

CRITICAL GIT RULE:
DO NOT PUSH TO GITHUB.

After implementation:
- run tests/build
- inspect git diff
- inspect git status
- verify .env is ignored

Then STOP and ask for approval before committing.