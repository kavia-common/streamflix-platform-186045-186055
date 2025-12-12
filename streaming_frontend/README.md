# streaming_frontend (StreamFlix UI)

React + Vite + TypeScript + TailwindCSS frontend for the StreamFlix platform.

## Prerequisites
- Node.js 18+ recommended

## Environment
Create a `.env` file (or use your shell env vars) based on `.env.example`.

- `VITE_API_BASE_URL` should point to the backend API origin (e.g. `http://localhost:8000`).
- The API client uses `credentials: "include"` so cookie-based auth works.

## Install
```bash
npm install
```

## Run (dev)
```bash
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

## Scripts
- `npm run lint` – ESLint
- `npm run format` – Prettier
- `npm run typecheck` – TypeScript typecheck
- `npm run build` – Production build
- `npm run preview` – Preview production build locally

## Pages
- `/` – Browse videos (search/filter + grid)
- `/history` – Watch history (requires login)
- `/login` – Login
- `/register` – Register

## Notes
- Dark/light theme toggle is persisted in `localStorage` and applied via the `dark` class on `<html>`.
- The player uses an HTML5 `<video>` element with a streaming URL derived from `VITE_API_BASE_URL`.
  If your backend uses a different streaming path, update `getVideoStreamUrl()` in `src/lib/api.ts`.
