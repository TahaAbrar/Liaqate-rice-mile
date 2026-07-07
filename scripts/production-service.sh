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

port_in_use() {
  local port="$1"
  local host="${2:-0.0.0.0}"
  if command -v ss &>/dev/null; then
    if [[ "$host" == "127.0.0.1" ]]; then
      ss -tln | grep -q "127.0.0.1:${port} "
    else
      ss -tln | grep -q ":${port} "
    fi
  else
    return 1
  fi
}

free_port() {
  local port="$1"
  local host="${2:-0.0.0.0}"
  if ! port_in_use "$port" "$host"; then
    return 0
  fi
  if command -v fuser &>/dev/null; then
    fuser -k "${port}/tcp" 2>/dev/null || true
    sleep 1
  fi
  if port_in_use "$port" "$host"; then
    echo "Port ${port} is already in use by another process." >&2
    echo "Check with: ss -tlnp | grep :${port}" >&2
    exit 1
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

free_port "$BACKEND_PORT" "127.0.0.1"
free_port "$PUBLIC_PORT"

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
