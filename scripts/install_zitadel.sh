#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-31.210.173.252}"
PUBLIC_PORT="${2:-8081}"
INSTALL_DIR="${INSTALL_DIR:-/opt/zitadel-compose}"
COMPOSE_URL="https://raw.githubusercontent.com/zitadel/zitadel/main/deploy/compose/docker-compose.yml"
ENV_URL="https://raw.githubusercontent.com/zitadel/zitadel/main/deploy/compose/.env.example"

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

curl -fsSLo docker-compose.yml "$COMPOSE_URL"
if [ ! -f .env ]; then
  curl -fsSLo .env.example "$ENV_URL"
  cp .env.example .env

  MASTERKEY="$(rand32)"
  POSTGRES_PASSWORD="$(rand32)"
  sed -i \
    -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=${DOMAIN}/" \
    -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=false/" \
    -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=http/" \
    -e "s/^ZITADEL_MASTERKEY=.*/ZITADEL_MASTERKEY=${MASTERKEY}/" \
    -e "s/^POSTGRES_ADMIN_PASSWORD=.*/POSTGRES_ADMIN_PASSWORD=${POSTGRES_PASSWORD}/" \
    -e "s#^ZITADEL_DATABASE_POSTGRES_DSN=.*#ZITADEL_DATABASE_POSTGRES_DSN=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/zitadel?sslmode=disable#" \
    .env
else
  echo ".env already exists; keeping existing secrets and updating public endpoint only."
  sed -i \
    -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=${DOMAIN}/" \
    -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=${PUBLIC_PORT}/" \
    -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=false/" \
    -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=http/" \
    .env
fi

if sudo ufw status 2>/dev/null | grep -q '^Status: active'; then
  sudo ufw allow "${PUBLIC_PORT}/tcp"
fi

echo "Starting ZITADEL..."
sudo docker compose --env-file .env -f docker-compose.yml pull
sudo docker compose --env-file .env -f docker-compose.yml up -d --wait

echo
echo "ZITADEL is running:"
echo "  URL: http://${DOMAIN}:${PUBLIC_PORT}"
echo "  Console URL: http://${DOMAIN}:${PUBLIC_PORT}/ui/console"
echo "  Configure an initial human admin before using this script for production."
echo
sudo docker compose ps
