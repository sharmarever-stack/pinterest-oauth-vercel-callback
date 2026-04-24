# Pinterest OAuth Vercel Callback

Dedicated Vercel app for Pinterest OAuth callbacks used by the Wix Pinterest Hub app.

## Endpoints

- `/api/health`
- `/api/pinterest/callback`

The callback route is intentionally thin. It receives `code`, `state`, and error parameters from Pinterest, then posts the payload back to the Wix popup opener so the Wix backend can complete the token exchange.
