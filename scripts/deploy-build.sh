#!/usr/bin/env bash
# Build backend + frontend for production (no sudo required).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

echo "==> Liaqat Rice Mills — production build"
echo "    Project: $ROOT"

# --- Python venv ---
if [[ ! -d "$ROOT/venv" ]]; then
  echo "==> Creating Python virtualenv..."
  python3 -m venv "$ROOT/venv"
fi

# shellcheck disable=SC1091
source "$ROOT/venv/bin/activate"
pip install -q --upgrade pip
pip install -q -r "$ROOT/backend/requirements.txt"

# --- Database migrations ---
echo "==> Running database migrations..."
cd "$ROOT/backend"
python manage.py migrate --noinput

# --- Frontend build ---
echo "==> Building frontend..."
cd "$ROOT"
npm install
npm run build

echo ""
echo "✓ Build complete."
echo "  Frontend: $ROOT/dist"
echo "  Backend:  venv ready, migrations applied"
echo ""
echo "Next: run with sudo to install nginx + systemd:"
echo "  sudo bash scripts/deploy-install.sh"
