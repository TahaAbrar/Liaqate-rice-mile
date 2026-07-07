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

if systemctl --user is-active --quiet liaqat-rice 2>/dev/null; then
  echo "==> Restarting systemd user service..."
  systemctl --user restart liaqat-rice
elif [[ -f "$ROOT/.run/gunicorn.pid" ]] || [[ -f "$ROOT/.run/frontend.pid" ]]; then
  echo "==> Restarting site (manual mode)..."
  bash "$ROOT/scripts/deploy-stop.sh"
  bash "$ROOT/scripts/deploy-start.sh"
else
  echo "==> No running deployment detected."
  echo "    Start with: npm run service:install  or  npm run deploy:start"
fi

echo "✓ Update complete."
