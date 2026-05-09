# ZITADEL SSO Handoff

This folder contains the handoff for the ZITADEL SSO setup on:

- Server: `tariq@31.210.173.252`
- Target domain: `https://sso.massdata.ae`
- Install path on server: `/opt/zitadel-compose`
- Local Docker port: `127.0.0.1:8081`
- Reverse proxy: nginx on ports `80` and `443`
- DNS: `sso.massdata.ae` is behind Cloudflare

## Current Status

ZITADEL is installed and running in Docker Compose on the server. It has been reconfigured for:

```text
https://sso.massdata.ae
```

The Docker stack should be reachable only from the server over the local proxy port:

```text
http://127.0.0.1:8081
```

The final nginx link from `https://sso.massdata.ae` to `127.0.0.1:8081` must be applied before production use. Public access to port `8081` must be blocked by binding the Compose port to localhost and enforcing firewall rules.

## Initial Admin

The initialized admin login for the current server setup is:

```text
Mass.Admin@zitadel.sso.massdata.ae
```

The temporary bootstrap password was shared in the setup chat. The template requires a password change on first login. Rotate the bootstrap password and login-client PAT after setup, and do not commit real production passwords to the repo.

## Files

- `compose/docker-compose.yml`: ZITADEL Compose stack with the human admin bootstrap settings parameterized through env vars.
- `compose/.env.example`: repo-safe environment template. Copy to `.env` and replace `CHANGE_ME...` values.
- `nginx/sso.massdata.ae.conf`: nginx reverse proxy config for the SSO domain.
- `scripts/configure_nginx_sso_massdata.sh`: applies the nginx config on the server. Requires working `sudo` or root.
- `scripts/set_zitadel_sso_domain.sh`: historical script used to reinitialize ZITADEL for `sso.massdata.ae`.
- `scripts/install_zitadel.sh`: historical first-install script for Ubuntu 22.04.
- `scripts/inspect_zitadel_users.sh`: helper to inspect generated login names.

## Apply nginx When sudo/root Is Available

SSH into the server:

```bash
ssh tariq@31.210.173.252
```

Then run:

```bash
/home/tariq/configure_nginx_sso_massdata.sh
```

If `sudo` password is unavailable, login as root and run:

```bash
bash /home/tariq/configure_nginx_sso_massdata.sh
```

Expected result:

```text
nginx is now proxying https://sso.massdata.ae to ZITADEL.
```

After nginx is applied, confirm public ingress is limited to ports `80` and `443`. Port `8081` must not be reachable from the internet.

## Useful Server Commands

Check stack status:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml ps
```

View logs:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml logs -f zitadel-api
```

Restart stack:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml up -d --wait
```

Inspect users:

```bash
/home/tariq/inspect_zitadel_users.sh
```

## Cloudflare Notes

For the domain, prefer Cloudflare SSL/TLS mode:

```text
Full
```

or:

```text
Full (strict)
```

Do not use `Flexible` unless you intentionally want Cloudflare-to-origin traffic over HTTP.

## Customization Starting Points

Use the ZITADEL console after login:

```text
https://sso.massdata.ae/ui/console
```

Common next changes:

- Change the initial admin password.
- Add real organization users.
- Configure SMTP/email provider.
- Add OIDC applications for your apps.
- Configure branding from Console settings.
- Move secrets out of committed files and into deployment secrets.
