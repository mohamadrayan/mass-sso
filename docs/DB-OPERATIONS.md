# Database Operations Runbook

ZITADEL uses PostgreSQL in the `postgres` Compose service.

## Inventory

- Compose directory: `/opt/zitadel-compose`
- Service: `postgres`
- Container: `zitadel-postgres-1`
- Database: `zitadel`
- Docker volume: `zitadel_postgres-data`
- Current DSN source: `ZITADEL_DATABASE_POSTGRES_DSN` in server-only `.env`

## Daily Checks

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml ps
docker exec zitadel-postgres-1 pg_isready -U postgres -d zitadel
docker system df
df -h
```

Escalate if:

- `postgres` is not healthy.
- Disk usage is above 80%.
- Docker volume growth is unexpected.
- Backups are missing or failing verification.

## Inspect Database Size

```bash
docker exec zitadel-postgres-1 psql -U postgres -d zitadel -c \
  "select pg_size_pretty(pg_database_size('zitadel')) as zitadel_db_size;"
```

## Backup Verification

Use `docs/BACKUP-RESTORE.md` for backup and restore commands. Every backup job must verify:

- `gzip -t` passes.
- `sha256sum -c` passes.
- A restore test succeeds on a non-production host at least monthly.

## Retention

Baseline retention:

- 14 daily backups.
- 4 weekly backups.
- One recent off-server backup.

Adjust retention based on business recovery requirements and available storage.

## Upgrade Procedure

1. Read ZITADEL and Postgres release notes.
2. Confirm the target image tags in `compose/.env.example`.
3. Take a fresh database backup.
4. Copy the server-only `.env` to the approved secrets backup location.
5. Run `docker compose --env-file .env -f docker-compose.yml config --quiet`.
6. Pull images:

   ```bash
   docker compose --env-file .env -f docker-compose.yml pull
   ```

7. Start the stack:

   ```bash
   docker compose --env-file .env -f docker-compose.yml up -d --wait
   ```

8. Validate:

   ```bash
   docker compose --env-file .env -f docker-compose.yml ps
   curl -fsSI -H 'Host: sso.massdata.ae' http://127.0.0.1:8081/ui/console
   ```

## Rollback Procedure

Use rollback only after confirming the failure cannot be fixed forward.

1. Stop the stack without deleting volumes:

   ```bash
   docker compose --env-file .env -f docker-compose.yml down
   ```

2. Restore the prior Compose file and `.env` from the pre-upgrade backup.
3. If the database was migrated and cannot run on the old image, restore the pre-upgrade database backup using `docs/BACKUP-RESTORE.md`.
4. Start the stack:

   ```bash
   docker compose --env-file .env -f docker-compose.yml up -d --wait
   ```

Do not use `docker compose down -v` for rollback unless the approved recovery plan explicitly requires deleting volumes and restoring from backup.

## Least-Privilege Database User

The current template uses the Postgres admin user in `ZITADEL_DATABASE_POSTGRES_DSN`. Before production hardening is complete, evaluate a least-privilege ZITADEL database role in a test environment and confirm migrations, setup, startup, and restore all work with that role.
