# Non-Root Container Evaluation

Date: 2026-05-09

Target images:

- `ghcr.io/zitadel/zitadel:v4.13.0`
- `ghcr.io/zitadel/zitadel-login:v4.13.0`

## Test Performed

A temporary Compose project was created on the server with:

- Separate project name: `zitadel-nonroot-test`
- Separate Docker volumes.
- Separate localhost port: `127.0.0.1:18081`
- `user: "0"` removed from `zitadel-api` and `zitadel-login`.

The production stack and volumes were not reused.

## Result

The non-root test did not pass.

`zitadel-api` became unhealthy during bootstrap. The relevant error was:

```text
open /zitadel/bootstrap/login-client.pat: permission denied
```

That file is written by `zitadel-api` into the shared `zitadel-bootstrap` volume and later read by `zitadel-login`.

## Decision

Keep `user: "0"` for `zitadel-api` and `zitadel-login` in the current v4.13.0 Compose file until the bootstrap token volume ownership model is changed and retested.

Do not remove `user: "0"` as a blind hardening change. It currently breaks first initialization.

## Follow-Up Options

- Pre-create the bootstrap volume with ownership compatible with the image default user.
- Split bootstrap token creation into a short-lived init job that fixes file permissions.
- Replace the shared PAT file flow with a supported non-root bootstrap mechanism if ZITADEL documents one for this image version.
- Retest after each ZITADEL image upgrade.
