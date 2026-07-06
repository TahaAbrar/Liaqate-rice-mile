#!/usr/bin/env bash
# Foreground runner for systemd — backend (gunicorn) + frontend on PUBLIC_PORT.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
RUN_DIR="$ROOT/.run"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

BACKEND_PORT="$(_env_get BACKEND_PORT 8006 "$ENV_FILE")"
PUBLIC_PORT="$(_env_get PUBLIC_PORT 8010 "$ENV_FILE")"

mkdir -p "$RUN_DIR"

stop_all() {
  if [[ -f "$RUN_DIR/frontend.pid" ]]; then
    kill "$(cat "$RUN_DIR/frontend.pid")" 2>/dev/null || true
    rm -f "$RUN_DIR/frontend.pid"
  fi
  if [[ -f "$RUN_DIR/gunicorn.pid" ]]; then
    kill "$(cat "$RUN_DIR/gunicorn.pid")" 2>/dev/null || true
    rm -f "$RUN_DIR/gunicorn.pid"
  fi
}

cleanup() {
  stop_all
}
trap cleanup EXIT INT TERM

if [[ ! -d "$ROOT/dist" ]]; then
  echo "dist/ missing — run: npm run deploy:build" >&2
  exit 1
fi

if [[ ! -x "$ROOT/venv/bin/gunicorn" ]]; then
  echo "gunicorn missing — run: npm run deploy:build" >&2
  exit 1
fi

stop_all

echo "Starting gunicorn on 127.0.0.1:${BACKEND_PORT}..."
cd "$ROOT/backend"
"$ROOT/venv/bin/gunicorn" backend.wsgi:application \
  --bind "127.0.0.1:${BACKEND_PORT}" \
  --workers 2 \
  --timeout 120 \
  --daemon \
  --pid "$RUN_DIR/gunicorn.pid" \
  --access-logfile "$RUN_DIR/gunicorn-access.log" \
  --error-logfile "$RUN_DIR/gunicorn-error.log"

sleep 1
if [[ ! -f "$RUN_DIR/gunicorn.pid" ]] || ! kill -0 "$(cat "$RUN_DIR/gunicorn.pid")" 2>/dev/null; then
  echo "gunicorn failed to start — see $RUN_DIR/gunicorn-error.log" >&2
  exit 1
fi

echo "Starting frontend on 0.0.0.0:${PUBLIC_PORT}..."
cd "$ROOT"
node "$ROOT/scripts/production-server.mjs" &
echo $! > "$RUN_DIR/frontend.pid"
wait "$(cat "$RUN_DIR/frontend.pid")"
