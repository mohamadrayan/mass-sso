# Backup and Restore Runbook

This deployment stores ZITADEL data in PostgreSQL inside Docker.

- Compose service: `postgres`
- Container name: `zitadel-postgres-1`
- Database: `zitadel`
- Data volume: `zitadel_postgres-data`
- Compose directory: `/opt/zitadel-compose`

## Backup

Run on the server:

```bash
ssh tariq@31.210.173.252
set -euo pipefail
cd /opt/zitadel-compose
mkdir -p backups
STAMP="$(date +%Y%m%d%H%M%S)"
BACKUP="backups/zitadel-${STAMP}.sql.gz"
TMP="${BACKUP}.tmp"
docker exec zitadel-postgres-1 pg_dump -U postgres -d zitadel | gzip > "$TMP"
gzip -t "$TMP"
mv "$TMP" "$BACKUP"
sha256sum "$BACKUP" > "${BACKUP}.sha256"
```

Also back up the server-only `.env` file separately into the approved secrets backup location. Do not commit `.env`.

## Verify Backup File

```bash
cd /opt/zitadel-compose
gzip -t backups/zitadel-YYYYMMDDHHMMSS.sql.gz
sha256sum -c backups/zitadel-YYYYMMDDHHMMSS.sql.gz.sha256
```

## Restore Test on a Non-Production Host

1. Copy the repo, `.env`, and selected backup to the test host.
2. Start Postgres only:

   ```bash
   cd /opt/zitadel-compose
   docker compose --env-file .env -f docker-compose.yml up -d --wait postgres
   ```

3. Clean the target database and restore:

   ```bash
   docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
     "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'zitadel';"
   docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
     "DROP DATABASE IF EXISTS zitadel;"
   docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
     "CREATE DATABASE zitadel;"
   gzip -dc backups/zitadel-YYYYMMDDHHMMSS.sql.gz |
     docker exec -i zitadel-postgres-1 psql -U postgres -d zitadel
   ```

4. Start the full stack:

   ```bash
   docker compose --env-file .env -f docker-compose.yml up -d --wait
   docker compose --env-file .env -f docker-compose.yml ps
   ```

5. Confirm login and console access on the test endpoint.

## Production Restore

Use only during an approved incident or disaster recovery window.

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml down
docker compose --env-file .env -f docker-compose.yml up -d --wait postgres
docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
  "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'zitadel';"
docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
  "DROP DATABASE IF EXISTS zitadel;"
docker exec zitadel-postgres-1 psql -U postgres -d postgres -c \
  "CREATE DATABASE zitadel;"
gzip -dc backups/zitadel-YYYYMMDDHHMMSS.sql.gz |
  docker exec -i zitadel-postgres-1 psql -U postgres -d zitadel
docker compose --env-file .env -f docker-compose.yml up -d --wait
```

This restore path intentionally drops and recreates the `zitadel` database before loading the backup. Restoring a plain SQL dump into an already-populated ZITADEL database is unsafe because it can fail on duplicate objects or leave mixed old/new state.

Do not use `docker compose down -v` during a normal restore unless the recovery plan explicitly calls for deleting the existing Docker volumes.

## Schedule and Retention

- Take a backup after bootstrap and before every upgrade.
- Take daily backups for production use.
- Keep at least 14 daily backups and 4 weekly backups unless a stronger retention policy is required.
- Store at least one recent backup outside the server.
- Test restore at least monthly and after major ZITADEL/Postgres upgrades.

## Recovery Requirements

A rebuild requires:

- This repo.
- Server-only `.env`.
- Latest verified database backup.
- TLS certificate material or a plan to reissue certificates.
- DNS and Cloudflare access.
- ZITADEL master key from the secrets vault.
