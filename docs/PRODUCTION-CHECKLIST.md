# Production Checklist

Use this checklist before treating `sso.massdata.ae` as production SSO.

## Network and Proxy

- Public ingress is limited to ports `80` and `443`.
- Docker-published Traefik port is bound to localhost only:

  ```yaml
  ports:
    - 127.0.0.1:${PROXY_HTTP_PUBLISHED_PORT}:80
  ```

- Port `8081` is not reachable from the internet.
- nginx is installed, enabled, and serving `sso.massdata.ae`.
- nginx port `80` server block redirects to HTTPS only.
- nginx port `443` server block proxies to `http://127.0.0.1:8081`.
- Cloudflare SSL/TLS mode is `Full (strict)` where possible, or `Full` if strict validation is not ready.
- Cloudflare SSL/TLS mode is not `Flexible`.

## ZITADEL Bootstrap

- `.env` exists only on the server and is not committed.
- `ZITADEL_MASTERKEY` is exactly 32 characters and stored in the secrets vault.
- `ZITADEL_ADMIN_PASSWORD` is temporary and rotated after first login.
- `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORDCHANGEREQUIRED` is `true`.
- Initial admin login is documented for operators only.
- SMTP/email provider is configured before inviting real users.
- MFA and password policies are configured before onboarding production users.
- Login-client PAT expiry is no more than 90 days from deployment.
- Login-client PAT rotation is scheduled.

## Database

- Postgres data is persisted in Docker volume `zitadel_postgres-data`.
- A `pg_dump` backup has been taken after bootstrap.
- Restore has been tested on a non-production host.
- Backup retention is documented.
- Disk usage monitoring exists for Docker volumes and backup storage.
- Operators understand that `docker compose down -v` deletes the database volume.

## Deployment

- `docker compose --env-file .env -f docker-compose.yml config --quiet` passes.
- `docker compose --env-file .env -f docker-compose.yml up -d --wait` completes.
- All services are healthy:

  ```bash
  docker compose --env-file .env -f docker-compose.yml ps
  ```

- Console responds over HTTPS:

  ```bash
  curl -fsSI https://sso.massdata.ae/ui/console
  ```

- Local proxy responds from the server only:

  ```bash
  curl -fsSI -H 'Host: sso.massdata.ae' http://127.0.0.1:8081/ui/console
  ```

## Go/No-Go

Do not go live if any of these are true:

- `http://31.210.173.252:8081` is publicly reachable.
- nginx has not been applied.
- No verified database backup exists.
- Bootstrap admin password has not been rotated.
- Login-client PAT expiry is long-lived or unknown.
- Restore has never been tested.
