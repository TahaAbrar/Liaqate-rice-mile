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

BACKEND_HOST="${BACKEND_HOST:-127.0.0.1}"
BACKEND_PORT="${BACKEND_PORT:-8006}"

cd "$ROOT/backend"
# shellcheck disable=SC1091
source "$ROOT/venv/bin/activate"
exec python manage.py runserver "${BACKEND_HOST}:${BACKEND_PORT}"
