# StreamFlix Frontend

React app with cookie-based auth, routing, and video streaming.

## Quick start

1. Configure backend base URL for dev:
   - Create or edit `.env.development`:
     ```
     REACT_APP_API_BASE=http://localhost:3001
     ```

2. Install deps and run:
   ```
   npm install
   npm run start
   ```

## Endpoints used
- Auth: `GET /auth/me`, `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`
- Videos: `GET /videos`, `GET /videos/:id`, `GET /videos/stream/:id`
- History: `GET /users/history`, `POST /users/history`

## Notes
- Axios is configured with `withCredentials: true`.
- VideoPlayer sends progress: start, 25%, finish.
