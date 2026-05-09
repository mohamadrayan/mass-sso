# Secrets Rotation Runbook

Do not commit production secrets. The server-only `.env` file must stay outside Git.

## Secret Inventory

| Secret | Location | Rotation Trigger |
| --- | --- | --- |
| `ZITADEL_MASTERKEY` | Server `.env` and secrets vault | Do not rotate casually. Required for encrypted ZITADEL data. Treat loss as disaster recovery. |
| `ZITADEL_ADMIN_PASSWORD` | Server `.env` during bootstrap only | Immediately after bootstrap, after staff changes, or suspected exposure. |
| `POSTGRES_ADMIN_PASSWORD` | Server `.env` | After suspected exposure, staff changes, or scheduled database credential rotation. |
| `LOGIN_CLIENT_PAT_EXPIRATION` / login-client PAT | ZITADEL bootstrap volume and ZITADEL state | At least every 90 days or immediately after suspected exposure. |
| TLS private key | `/etc/letsencrypt/live/...` | On certificate compromise or normal certificate renewal schedule. |

## Master Key Handling

`ZITADEL_MASTERKEY` must be exactly 32 characters for new deployments.

- Store it in the approved secrets vault.
- Back it up with disaster recovery material.
- Never paste it into tickets, chat, or Git.
- Do not rotate it without a tested ZITADEL-specific migration plan.

## Bootstrap Admin Password

After first successful login:

1. Change the admin password in the ZITADEL console.
2. Store the new admin credential in the approved password vault.
3. Remove or rotate the temporary bootstrap password from the server `.env` if it is no longer needed for rebuild documentation.
4. Confirm `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORDCHANGEREQUIRED` remains `true` in the repo template.

## Login-Client PAT

The login-client PAT must not be long-lived.

- Set `LOGIN_CLIENT_PAT_EXPIRATION` to a timestamp no more than 90 days from deployment.
- Track the expiry in the operations calendar.
- Rotate before expiry.
- Restart dependent login services after rotation.

After rotation, validate:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml up -d --wait
curl -fsSI -H 'Host: sso.massdata.ae' http://127.0.0.1:8081/ui/console
```

## Postgres Admin Password

Before rotating, take a verified backup.

1. Generate a new password and store it in the secrets vault.
2. Update Postgres credentials and the ZITADEL DSN in server-only `.env`.
3. Apply the password change inside Postgres.
4. Restart the stack.
5. Confirm ZITADEL API and login services are healthy.

Because this deployment currently uses the Postgres admin user in the ZITADEL DSN, test the full rotation in a non-production environment first.

## Exposure Response

If any production secret is exposed:

1. Revoke or rotate the secret immediately.
2. Review ZITADEL audit logs.
3. Review server SSH and Docker logs.
4. Rotate related secrets if the blast radius is unclear.
5. Record the incident and remediation in the incident log.
