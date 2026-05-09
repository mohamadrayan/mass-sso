# Production Readiness Review for Commit 8d48f22

Review target: `8d48f22 Update ZITADEL admin handoff`

Review date: 2026-05-09

Scope: This repository is a ZITADEL SSO handoff and single-host deployment package. It is not a full application repository. The reviewed surface includes Docker Compose, `.env.example`, nginx config, setup/reset scripts, and operational handoff notes.

## Executive Assessment

The submitted review is technically sound. I agree with the main conclusion: the repo contains the core handoff assets needed to rebuild or understand the deployment, but it is not production-complete yet.

The highest-risk findings are valid and should be treated as blockers before relying on this SSO service for production authentication:

- Public direct access to Docker port `8081` bypasses the intended TLS/domain path.
- The nginx HTTP block proxies instead of redirecting to HTTPS.
- `scripts/set_zitadel_sso_domain.sh` is destructive because it runs `docker compose down -v`.
- Bootstrap admin and long-lived PAT settings need post-bootstrap cleanup and rotation.
- Database operations are functional but under-documented for backup, restore, monitoring, and rollback.

## Finding Evaluation

| Finding | My Evaluation | Severity | Notes |
| --- | --- | --- | --- |
| SSO reachable directly on `http://31.210.173.252:8081` | Valid | Critical | `README.md` documents public Docker access and says nginx was not applied. Public ingress should be `80/443` only. Docker port `8081` should be bound to localhost or blocked by firewall after nginx is active. |
| nginx HTTP server proxies instead of redirecting | Valid | High | `nginx/sso.massdata.ae.conf` currently proxies `listen 80` traffic and sets `X-Forwarded-Proto https`. The safer behavior is `return 301 https://$host$request_uri;`. |
| ZITADEL containers run as root | Valid, needs image verification | Medium | `compose/docker-compose.yml` sets `user: "0"` for `zitadel-api` and `zitadel-login`. Remove this unless the image requires root for the mounted bootstrap token workflow. |
| Bootstrap admin setup weakens first-login security | Valid | High | `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORDCHANGEREQUIRED: false` is operationally convenient but weak for production. After bootstrap, rotate the password, require password change, and remove temporary bootstrap assumptions from deployment docs. |
| Long-lived machine token | Valid | High | `LOGIN_CLIENT_PAT_EXPIRATION=2099-01-01T00:00:00Z` is too long for production. Use a shorter expiry and document rotation. |
| Destructive reset script wipes database | Valid | Critical | `scripts/set_zitadel_sso_domain.sh` runs `docker compose --env-file .env -f docker-compose.yml down -v`, which removes the Postgres named volume. This script must be marked historical/destructive or guarded with an explicit confirmation. |
| DB runs in Compose with named volume | Valid | Informational | Current setup is acceptable for a simple single-host deployment, but operational runbooks are missing. |
| DSN uses Postgres admin user | Valid | Medium | Good enough for bootstrap, not ideal for production. A least-privilege app role should be evaluated and tested with ZITADEL migrations. |

## Database Notes

The current database is PostgreSQL inside Docker:

- Service: `postgres`
- Container name on the server: `zitadel-postgres-1`
- Database: `zitadel`
- Data persistence: Docker named volume `zitadel_postgres-data`

This is functional for a small single-host setup, but the repo needs explicit operations documentation before production use:

- Backup command using `pg_dump`.
- Restore command and test procedure.
- Backup retention policy.
- Disk usage monitoring and alerting.
- Upgrade and rollback path for Postgres and ZITADEL.
- Clear warning that `docker compose down -v` deletes the database volume.

## Recommended Remediation Order

1. Apply nginx or another reverse proxy as the public entrypoint for `sso.massdata.ae`.
2. Remove public direct access to `8081` by binding the Compose port to `127.0.0.1` and/or enforcing firewall rules.
3. Change the nginx HTTP server block to redirect to HTTPS.
4. Guard or retire `scripts/set_zitadel_sso_domain.sh` because it destroys volumes.
5. Require bootstrap admin password change and document post-bootstrap cleanup.
6. Shorten and rotate the login-client PAT.
7. Add backup/restore and production checklist docs.
8. Review non-root container execution for ZITADEL images.

## Documentation Gaps to Add

Minimum recommended docs:

- `docs/PRODUCTION-CHECKLIST.md`
- `docs/SECURITY.md`
- `docs/BACKUP-RESTORE.md`
- `docs/DB-OPERATIONS.md`
- `docs/SECRETS-ROTATION.md`
- `docs/OIDC-APP-ONBOARDING.md`
- `docs/CLOUDFLARE-NGINX-CUTOVER.md`
- `docs/INCIDENT-RUNBOOK.md`
- `docs/UPGRADE-ROLLBACK.md`

The first two docs to add should be `PRODUCTION-CHECKLIST.md` and `BACKUP-RESTORE.md`, because they cover the highest operational risk.

## Current Decision

I accept the review findings as actionable. The repo should not be considered production-ready until the critical and high-severity items above are resolved or explicitly risk-accepted by the owner.

No production password or secret should be committed while addressing this review.
