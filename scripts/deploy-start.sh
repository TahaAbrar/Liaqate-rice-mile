#!/usr/bin/env bash
# Start production site manually (no systemd).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
RUN_DIR="$ROOT/.run"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

PUBLIC_PORT="$(_env_get PUBLIC_PORT 8010 "$ENV_FILE")"
BACKEND_PORT="$(_env_get BACKEND_PORT 8006 "$ENV_FILE")"
APP_URL="$(_env_get APP_URL "http://127.0.0.1:${PUBLIC_PORT}" "$ENV_FILE")"

mkdir -p "$RUN_DIR"

is_running() {
  local pidfile="$1"
  [[ -f "$pidfile" ]] && kill -0 "$(cat "$pidfile")" 2>/dev/null
}

free_port_if_needed() {
  local port="$1"
  if ! command -v ss &>/dev/null; then
    return
  fi
  if ss -tln | grep -q ":${port} "; then
    # Don't kill our own frontend
    if is_running "$RUN_DIR/frontend.pid"; then
      return
    fi
    echo "==> Port ${port} is busy (likely old Django) — freeing..."
    if command -v fuser &>/dev/null; then
      fuser -k "${port}/tcp" 2>/dev/null || true
    else
      echo "   Install psmisc or stop the process on port ${port} manually."
      exit 1
    fi
    sleep 1
  fi
}

if is_running "$RUN_DIR/gunicorn.pid" && is_running "$RUN_DIR/frontend.pid"; then
  echo "Site already running. Stop first:"
  echo "  npm run deploy:stop"
  exit 1
fi

# Clean partial runs
bash "$(dirname "$0")/deploy-stop.sh" 2>/dev/null || true

if [[ ! -d "$ROOT/dist" ]]; then
  echo "dist/ missing — building first..."
  bash "$ROOT/scripts/deploy-build.sh"
fi

if [[ ! -x "$ROOT/venv/bin/gunicorn" ]]; then
  echo "gunicorn missing — run: npm run deploy:build"
  exit 1
fi

free_port_if_needed "$PUBLIC_PORT"

echo "==> Starting Django API (gunicorn) on 127.0.0.1:${BACKEND_PORT}..."
cd "$ROOT/backend"
"$ROOT/venv/bin/gunicorn" backend.wsgi:application \
  --bind "127.0.0.1:${BACKEND_PORT}" \
  --workers 2 \
  --timeout 120 \
  --daemon \
  --pid "$RUN_DIR/gunicorn.pid" \
  --access-logfile "$RUN_DIR/gunicorn-access.log" \
  --error-logfile "$RUN_DIR/gunicorn-error.log"

cd "$ROOT"
echo "==> Starting frontend on 0.0.0.0:${PUBLIC_PORT}..."
nohup node "$ROOT/scripts/production-server.mjs" > "$RUN_DIR/frontend.log" 2>&1 &
echo $! > "$RUN_DIR/frontend.pid"

sleep 2

if ! is_running "$RUN_DIR/gunicorn.pid"; then
  echo "✗ Backend failed. Check $RUN_DIR/gunicorn-error.log"
  exit 1
fi
if ! is_running "$RUN_DIR/frontend.pid"; then
  echo "✗ Frontend failed. Check $RUN_DIR/frontend.log"
  cat "$RUN_DIR/frontend.log" 2>/dev/null || true
  exit 1
fi

# Health check — must serve React, not Django 404
if ! curl -sf "http://127.0.0.1:${PUBLIC_PORT}/" | grep -q 'id="root"'; then
  echo "✗ Frontend health check failed on port ${PUBLIC_PORT}."
  echo "  Log: $RUN_DIR/frontend.log"
  tail -20 "$RUN_DIR/frontend.log" 2>/dev/null || true
  exit 1
fi

echo ""
echo "✓ Site is live (no sudo mode)"
echo "  URL:   ${APP_URL}"
echo "  Admin: ${APP_URL}/admin/login"
echo ""
echo "  Logs:  tail -f $RUN_DIR/frontend.log"
echo "         tail -f $RUN_DIR/gunicorn-error.log"
echo "  Stop:  npm run deploy:stop"
