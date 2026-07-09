#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

DEV_BACKEND_PORT="${DEV_BACKEND_PORT:-${BACKEND_PORT:-8006}}"
BACKEND_BIND_HOST="${BACKEND_BIND_HOST:-0.0.0.0}"

cd "$ROOT/backend"
# shellcheck disable=SC1091
source "$ROOT/venv/bin/activate"
exec python manage.py runserver "${BACKEND_BIND_HOST}:${DEV_BACKEND_PORT}"
