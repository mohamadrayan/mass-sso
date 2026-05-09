#!/usr/bin/env bash
set -euo pipefail

cd /opt/zitadel-compose

MASTERKEY="$(openssl rand -hex 16)"
POSTGRES_PASSWORD="$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 32 || true)"
if [ "${#POSTGRES_PASSWORD}" -lt 32 ]; then
  POSTGRES_PASSWORD="$(openssl rand -hex 16)"
fi

sed -i \
  -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=31.210.173.252/" \
  -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=8081/" \
  -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=8081/" \
  -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=false/" \
  -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=http/" \
  -e "s/^ZITADEL_MASTERKEY=.*/ZITADEL_MASTERKEY=${MASTERKEY}/" \
  -e "s/^POSTGRES_ADMIN_PASSWORD=.*/POSTGRES_ADMIN_PASSWORD=${POSTGRES_PASSWORD}/" \
  -e "s#^ZITADEL_DATABASE_POSTGRES_DSN=.*#ZITADEL_DATABASE_POSTGRES_DSN=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/zitadel?sslmode=disable#" \
  .env

echo "Updated endpoint:"
grep -E '^(ZITADEL_DOMAIN|PROXY_HTTP_PUBLISHED_PORT|ZITADEL_EXTERNALPORT|ZITADEL_EXTERNALSECURE|ZITADEL_PUBLIC_SCHEME)=' .env

docker compose --env-file .env -f docker-compose.yml pull
docker compose --env-file .env -f docker-compose.yml up -d --wait
docker compose ps
