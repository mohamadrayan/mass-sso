#!/usr/bin/env bash
set -euo pipefail

# DESTRUCTIVE: this script reinitializes ZITADEL and deletes Docker volumes,
# including the Postgres database volume.

cd /opt/zitadel-compose

ADMIN_PASSWORD="${ZITADEL_ADMIN_PASSWORD:-CHANGE_ME_STRONG_INITIAL_PASSWORD}"
ADMIN_EMAIL="${ZITADEL_ADMIN_EMAIL:-Mass.Admin@sso.massdata.ae}"

cp .env ".env.bak.$(date +%Y%m%d%H%M%S)"
cp docker-compose.yml "docker-compose.yml.bak.$(date +%Y%m%d%H%M%S)"

sed -i \
  -e "s/^ZITADEL_DOMAIN=.*/ZITADEL_DOMAIN=sso.massdata.ae/" \
  -e "s/^PROXY_HTTP_PUBLISHED_PORT=.*/PROXY_HTTP_PUBLISHED_PORT=8081/" \
  -e "s/^ZITADEL_EXTERNALPORT=.*/ZITADEL_EXTERNALPORT=443/" \
  -e "s/^ZITADEL_EXTERNALSECURE=.*/ZITADEL_EXTERNALSECURE=true/" \
  -e "s/^ZITADEL_PUBLIC_SCHEME=.*/ZITADEL_PUBLIC_SCHEME=https/" \
  .env

if ! grep -q 'ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME' docker-compose.yml; then
  sed -i '/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORDCHANGEREQUIRED: false/a\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME: Mass.Admin\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_FIRSTNAME: Mass\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_LASTNAME: Admin\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_EMAIL_ADDRESS: ${ZITADEL_ADMIN_EMAIL}\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_EMAIL_VERIFIED: true\
      ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD: ${ZITADEL_ADMIN_PASSWORD}' docker-compose.yml
else
  sed -i \
    -e "s/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME:.*/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME: Mass.Admin/" \
    -e "s/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_FIRSTNAME:.*/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_FIRSTNAME: Mass/" \
    -e "s/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_EMAIL_ADDRESS:.*/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_EMAIL_ADDRESS: \${ZITADEL_ADMIN_EMAIL}/" \
    -e "s/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD:.*/ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD: \${ZITADEL_ADMIN_PASSWORD}/" \
    docker-compose.yml
fi

if ! grep -q '^ZITADEL_ADMIN_EMAIL=' .env; then
  echo "ZITADEL_ADMIN_EMAIL=${ADMIN_EMAIL}" >> .env
else
  sed -i "s/^ZITADEL_ADMIN_EMAIL=.*/ZITADEL_ADMIN_EMAIL=${ADMIN_EMAIL}/" .env
fi

if ! grep -q '^ZITADEL_ADMIN_PASSWORD=' .env; then
  echo "ZITADEL_ADMIN_PASSWORD=${ADMIN_PASSWORD}" >> .env
fi

cat <<'WARNING'
WARNING: this script will run:

  docker compose --env-file .env -f docker-compose.yml down -v

That deletes the ZITADEL Docker volumes, including the Postgres database
volume. Continue only for a deliberate reinitialization after backups have
been verified.
WARNING

read -r -p "Type DELETE ZITADEL DATA to continue: " CONFIRM
if [ "${CONFIRM}" != "DELETE ZITADEL DATA" ]; then
  echo "Aborted. No containers or volumes were removed."
  exit 1
fi

docker compose --env-file .env -f docker-compose.yml down -v
docker compose --env-file .env -f docker-compose.yml up -d --wait
docker compose --env-file .env -f docker-compose.yml ps

echo
echo "ZITADEL is configured for:"
echo "  https://sso.massdata.ae"
echo "Admin login:"
echo "  Mass.Admin@zitadel.sso.massdata.ae"
echo "Password:"
echo "  value of ZITADEL_ADMIN_PASSWORD in /opt/zitadel-compose/.env"
