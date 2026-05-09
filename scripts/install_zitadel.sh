#!/usr/bin/env bash
set -euo pipefail

# LEGACY/HISTORICAL: kept for audit of the first bootstrap flow.
# Prefer the checked-in compose/ and nginx/ templates for production rebuilds.

cat <<'WARNING'
WARNING: install_zitadel.sh is a legacy bootstrap helper.

It installs Docker packages, mutates /opt/zitadel-compose, and starts a fresh
ZITADEL stack. Prefer the checked-in compose/ and nginx/ templates for
production. Continue only on a new host or an approved rebuild window.
WARNING

read -r -p "Type RUN LEGACY INSTALL to continue: " CONFIRM
if [ "${CONFIRM}" != "RUN LEGACY INSTALL" ]; then
  echo "Aborted. No changes were made."
  exit 1
fi

DOMAIN="${1:-sso.massdata.ae}"
PUBLIC_PORT="${2:-8081}"
INSTALL_DIR="${INSTALL_DIR:-/opt/zitadel-compose}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_TEMPLATE="${REPO_DIR}/compose/docker-compose.yml"
ENV_TEMPLATE="${REPO_DIR}/compose/.env.example"

need_cmd() {
  command -v "$1" >/dev/null 2>&1
}

rand32() {
  tr -dc A-Za-z0-9 </dev/urandom | head -c 32
}

echo "Checking sudo access..."
sudo -v

if ss -tuln | awk '{print $5}' | grep -Eq "(:|\\])${PUBLIC_PORT}$"; then
  echo "Port ${PUBLIC_PORT} is already in use. Run: $0 ${DOMAIN} <free-port>"
  exit 1
fi

echo "Installing Docker Engine and Compose plugin if needed..."
if ! need_cmd docker || ! docker compose version >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl gnupg
  sudo install -m 0755 -d /etc/apt/keyrings
  if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
  fi
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" |
    sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  sudo systemctl enable --now docker
fi

if ! id -nG "$USER" | grep -qw docker; then
  sudo usermod -aG docker "$USER" || true
fi

if [ "$(swapon --noheadings | wc -l)" -eq 0 ]; then
  echo "No swap detected; creating a 2G swapfile to reduce startup memory pressure..."
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  if ! grep -q '^/swapfile ' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
  fi
fi

echo "Preparing ZITADEL compose stack in ${INSTALL_DIR}..."
sudo mkdir -p "$INSTALL_DIR"
sudo chown "$USER:$USER" "$INSTALL_DIR"
cd "$INSTALL_DIR"

cp "$COMPOSE_TEMPLATE" docker-compose.yml
if [ ! -f .env ]; then
  cp "$ENV_TEMPLATE" .env.example
  cp .env.example .env

  MASTERKEY="$(rand32)"
  POSTGRES_PASSWORD="$(rand32)"
  sed -i \
    -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=${DOMAIN}/" \
    -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=443/" \
    -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=true/" \
    -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=https/" \
    -e "s/^ZITADEL_MASTERKEY=.*/ZITADEL_MASTERKEY=${MASTERKEY}/" \
    -e "s/^POSTGRES_ADMIN_PASSWORD=.*/POSTGRES_ADMIN_PASSWORD=${POSTGRES_PASSWORD}/" \
    -e "s#^ZITADEL_DATABASE_POSTGRES_DSN=.*#ZITADEL_DATABASE_POSTGRES_DSN=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/zitadel?sslmode=disable#" \
    .env
else
  echo ".env already exists; keeping existing secrets and updating public endpoint only."
  sed -i \
    -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=${DOMAIN}/" \
    -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=443/" \
    -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=true/" \
    -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=https/" \
    .env
fi

echo "Starting ZITADEL..."
sudo docker compose --env-file .env -f docker-compose.yml pull
sudo docker compose --env-file .env -f docker-compose.yml up -d --wait

echo
echo "ZITADEL is running:"
echo "  Local URL: http://127.0.0.1:${PUBLIC_PORT}"
echo "  Public URL requires nginx/TLS: https://${DOMAIN}/ui/console"
echo "  Do not expose ${PUBLIC_PORT} publicly."
echo
sudo docker compose ps
