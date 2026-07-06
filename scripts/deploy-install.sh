#!/usr/bin/env bash
# Install nginx site + systemd service (requires sudo).
set -euo pipefail

if [[ "${EUID}" -eq 0 ]]; then
  echo "Run as your normal user (script will call sudo internally): bash scripts/deploy-install.sh"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"

# shellcheck disable=SC1091
source "$(dirname "$0")/lib/env.sh"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env — run: npm run deploy:env"
  exit 1
fi

PUBLIC_PORT="$(_env_get PUBLIC_PORT 80 "$ENV_FILE")"
BACKEND_PORT="$(_env_get BACKEND_PORT 8006 "$ENV_FILE")"
DEPLOY_USER="$(whoami)"
SERVER_NAME="$(_env_get SERVER_NAME _ "$ENV_FILE")"
APP_URL="$(_env_get APP_URL "" "$ENV_FILE")"

if [[ "$SERVER_NAME" == "_" && -n "$APP_URL" ]]; then
  SERVER_NAME="$(echo "$APP_URL" | sed -E 's#https?://([^/:]+).*#\1#')"
fi

if [[ ! -d "$ROOT/dist" ]]; then
  echo "dist/ not found — run build first:"
  echo "  bash scripts/deploy-build.sh"
  exit 1
fi

if [[ ! -x "$ROOT/venv/bin/gunicorn" ]]; then
  echo "gunicorn not found — run build first:"
  echo "  bash scripts/deploy-build.sh"
  exit 1
fi

echo "==> Installing production services"
echo "    Root:         $ROOT"
echo "    User:         $DEPLOY_USER"
echo "    Public port:  $PUBLIC_PORT"
echo "    Backend port: $BACKEND_PORT (internal)"
echo "    Server name:  $SERVER_NAME"

# --- Render nginx config ---
NGINX_RENDERED="/tmp/liaqat-rice-nginx.conf"
sed \
  -e "s|__PUBLIC_PORT__|$PUBLIC_PORT|g" \
  -e "s|__SERVER_NAME__|$SERVER_NAME|g" \
  -e "s|__DEPLOY_ROOT__|$ROOT|g" \
  -e "s|__BACKEND_PORT__|$BACKEND_PORT|g" \
  "$ROOT/deploy/nginx/liaqat-rice.conf.template" > "$NGINX_RENDERED"

# --- Render systemd unit ---
SYSTEMD_RENDERED="/tmp/liaqat-backend.service"
sed \
  -e "s|__DEPLOY_USER__|$DEPLOY_USER|g" \
  -e "s|__DEPLOY_ROOT__|$ROOT|g" \
  -e "s|__BACKEND_PORT__|$BACKEND_PORT|g" \
  "$ROOT/deploy/systemd/liaqat-backend.service.template" > "$SYSTEMD_RENDERED"

# --- Install nginx if missing ---
if ! command -v nginx &>/dev/null; then
  echo "==> Installing nginx..."
  sudo apt-get update -qq
  sudo apt-get install -y nginx
fi

# --- Install configs ---
echo "==> Installing nginx site..."
sudo cp "$NGINX_RENDERED" /etc/nginx/sites-available/liaqat-rice
sudo ln -sf /etc/nginx/sites-available/liaqat-rice /etc/nginx/sites-enabled/liaqat-rice

# Remove default site if it conflicts on same port
if [[ "$PUBLIC_PORT" == "80" && -f /etc/nginx/sites-enabled/default ]]; then
  sudo rm -f /etc/nginx/sites-enabled/default
fi

sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo "==> Installing systemd service..."
sudo cp "$SYSTEMD_RENDERED" /etc/systemd/system/liaqat-backend.service
sudo systemctl daemon-reload
sudo systemctl enable liaqat-backend
sudo systemctl restart liaqat-backend

# --- Firewall hint ---
if command -v ufw &>/dev/null && sudo ufw status | grep -q "Status: active"; then
  sudo ufw allow "$PUBLIC_PORT/tcp" || true
fi

echo ""
echo "✓ Deployment installed!"
echo ""
if [[ "$PUBLIC_PORT" == "80" ]]; then
  SITE_URL="http://${SERVER_NAME}"
else
  SITE_URL="http://${SERVER_NAME}:${PUBLIC_PORT}"
fi
echo "  Site:    ${SITE_URL}"
echo "  Admin:   ${SITE_URL}/admin/login"
echo "  API:     ${SITE_URL}/api/content/"
echo ""
echo "  Backend logs:  journalctl -u liaqat-backend -f"
echo "  Restart API:   sudo systemctl restart liaqat-backend"
echo "  Restart nginx: sudo systemctl reload nginx"
