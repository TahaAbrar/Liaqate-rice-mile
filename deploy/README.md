# Liaqat Rice Mills — Server Deployment

Production stack options:

| Mode | Needs sudo? | Command |
|------|-------------|---------|
| **No-sudo (VPS user)** | No | `npm run deploy:start` |
| **Systemd user service** | No | `npm run service:install` |
| **Nginx + systemd** | Yes | `npm run deploy:install` |

## Recommended — Auto-start service (port 8010)

Runs on boot, restarts on crash, survives SSH logout:

```bash
npm run deploy:build      # first time only
npm run service:install   # install + start systemd user service
```

| Command | Action |
|---------|--------|
| `npm run service:status` | Check if running |
| `npm run service:restart` | Restart |
| `npm run service:stop` | Stop |
| `npm run service:logs` | Live logs |

## Quick start — NO sudo (your case)

Build is already done. Just start:

```bash
cd Liaqate-rice-mile
npm run deploy:start
```

Site: **http://194.163.154.222:8010** (from your `.env`)

Stop: `npm run deploy:stop`

**Important:** Open port **8010** in your VPS hosting panel (Contabo/firewall).

**Full manual (PDF/Word):** `deploy/Liaqat-Rice-Mills-Deployment-Manual.html`

## Full setup (no sudo)

```bash
npm run deploy:env      # already done
npm run deploy:build    # already done
npm run deploy:start    # start site
```

## Quick start — WITH sudo (nginx)

```bash
npm run deploy:env
npm run deploy:build
npm run deploy:install
```

## Update after code changes

```bash
npm run deploy:update
```

## Manual commands

| Task | Command |
|------|---------|
| Backend logs | `journalctl -u liaqat-backend -f` |
| Restart API | `sudo systemctl restart liaqat-backend` |
| Reload nginx | `sudo systemctl reload nginx` |
| Run migrations | `cd backend && ../venv/bin/python manage.py migrate` |

## Files

| File | Purpose |
|------|---------|
| `scripts/deploy-env-init.sh` | Generate production `.env` |
| `scripts/deploy-build.sh` | venv, pip, migrate, `npm run build` |
| `scripts/deploy-install.sh` | nginx + systemd install |
| `scripts/deploy-update.sh` | git pull + rebuild + restart |
| `deploy/nginx/liaqat-rice.conf.template` | Nginx site template |
| `deploy/systemd/liaqat-backend.service.template` | Gunicorn service |

## Custom port (e.g. 8080)

In `.env`:
```env
PUBLIC_PORT=8080
APP_URL=http://YOUR_IP:8080
CORS_ORIGINS=http://YOUR_IP:8080
```

Then re-run `npm run deploy:install`.

## HTTPS (optional)

After domain points to server:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```
