#!/usr/bin/env bash
# Pull latest code, rebuild, migrate, restart services.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Updating Liaqat Rice Mills deployment"

if [[ -d .git ]]; then
  echo "==> git pull..."
  git pull
fi

bash "$ROOT/scripts/deploy-build.sh"

if systemctl is-active --quiet liaqat-backend 2>/dev/null; then
  echo "==> Restarting backend (systemd)..."
  sudo systemctl restart liaqat-backend
elif [[ -f "$ROOT/.run/gunicorn.pid" ]]; then
  echo "==> Restarting site (no-sudo mode)..."
  bash "$ROOT/scripts/deploy-stop.sh"
  bash "$ROOT/scripts/deploy-start.sh"
fi

if command -v nginx &>/dev/null && systemctl is-active --quiet nginx 2>/dev/null; then
  echo "==> Reloading nginx..."
  sudo nginx -t && sudo systemctl reload nginx
fi

echo "✓ Update complete."
