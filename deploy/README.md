# Liaqat Rice Mills — Server Deployment

Starts and stops the application on **port 8010**. SSL and reverse proxy are configured separately on your server.

## Commands

| Command | Action |
|---------|--------|
| `npm run deploy:build` | Build for production (first time) |
| `npm run deploy:start` | Start app on port 8010 |
| `npm run deploy:stop` | Stop app |
| `npm run service:install` | Install auto-start service (port 8010) |
| `npm run service:status` | Check if running |
| `npm run service:restart` | Restart |
| `npm run service:stop` | Stop service |
| `npm run service:logs` | Live logs |
| `npm run deploy:update` | Pull, rebuild, restart |

## First-time setup

```bash
npm run deploy:env      # optional — create .env
npm run deploy:build
npm run service:install # or: npm run deploy:start
```

## What runs

- **Port 8010** — Node server (React app + `/api` proxy). This is the only public port.
- **Port 8006** — Django/Gunicorn on `127.0.0.1` only (internal, not exposed).

## `.env` (optional)

Default listen port is 8010. Override only if needed:

```env
PUBLIC_PORT=8010
```
