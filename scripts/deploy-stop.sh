#!/usr/bin/env bash
# Stop production site started with deploy-start.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RUN_DIR="$ROOT/.run"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

PUBLIC_PORT="$(_env_get PUBLIC_PORT 8010 "$ROOT/.env")"
BACKEND_PORT="$(_env_get BACKEND_PORT 8006 "$ROOT/.env")"

stop_pid() {
  local name="$1"
  local pidfile="$2"
  if [[ -f "$pidfile" ]]; then
    local pid
    pid="$(cat "$pidfile")"
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      sleep 1
      kill -9 "$pid" 2>/dev/null || true
      echo "  Stopped $name (pid $pid)"
    fi
    rm -f "$pidfile"
  fi
}

echo "==> Stopping Liaqat Rice Mills..."

stop_pid "frontend" "$RUN_DIR/frontend.pid"
stop_pid "preview (legacy)" "$RUN_DIR/preview.pid"
stop_pid "backend" "$RUN_DIR/gunicorn.pid"

if command -v fuser &>/dev/null; then
  fuser -k "${PUBLIC_PORT}/tcp" 2>/dev/null || true
  fuser -k "${BACKEND_PORT}/tcp" 2>/dev/null || true
fi

echo "✓ Stopped."
