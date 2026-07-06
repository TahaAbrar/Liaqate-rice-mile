#!/usr/bin/env bash
# Install user-level systemd service (no sudo required).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
USER_UNIT_DIR="${HOME}/.config/systemd/user"
SERVICE_NAME="liaqat-rice.service"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

PUBLIC_PORT="$(_env_get PUBLIC_PORT 8010 "$ENV_FILE")"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env — run: npm run deploy:env"
  exit 1
fi

if [[ ! -d "$ROOT/dist" ]]; then
  echo "dist/ missing — run: npm run deploy:build"
  exit 1
fi

chmod +x "$ROOT/scripts/production-service.sh"

mkdir -p "$USER_UNIT_DIR" "$ROOT/.run"

RENDERED="$USER_UNIT_DIR/$SERVICE_NAME"
sed \
  -e "s|__DEPLOY_ROOT__|$ROOT|g" \
  -e "s|__PUBLIC_PORT__|$PUBLIC_PORT|g" \
  "$ROOT/deploy/systemd/liaqat-rice-user.service.template" > "$RENDERED"

echo "==> Installed: $RENDERED"

# Stop manual deploy if running (avoid port conflict)
if [[ -f "$ROOT/scripts/deploy-stop.sh" ]]; then
  bash "$ROOT/scripts/deploy-stop.sh" 2>/dev/null || true
fi

systemctl --user daemon-reload
systemctl --user enable liaqat-rice
systemctl --user restart liaqat-rice

# Keep running after SSH logout
if loginctl enable-linger "$(whoami)" 2>/dev/null; then
  echo "==> User linger enabled (service survives logout)"
else
  echo "==> Note: run 'loginctl enable-linger $(whoami)' if service stops after logout"
fi

sleep 2

if systemctl --user is-active --quiet liaqat-rice; then
  APP_URL="$(_env_get APP_URL "http://127.0.0.1:${PUBLIC_PORT}" "$ENV_FILE")"
  echo ""
  echo "✓ Service running on port ${PUBLIC_PORT}"
  echo "  URL:   ${APP_URL}"
  echo "  Admin: ${APP_URL}/admin/login"
  echo ""
  echo "  Status:  systemctl --user status liaqat-rice"
  echo "  Logs:    journalctl --user -u liaqat-rice -f"
  echo "  Restart: systemctl --user restart liaqat-rice"
  echo "  Stop:    systemctl --user stop liaqat-rice"
else
  echo "✗ Service failed to start"
  systemctl --user status liaqat-rice --no-pager || true
  tail -30 "$ROOT/.run/service.log" 2>/dev/null || true
  exit 1
fi
