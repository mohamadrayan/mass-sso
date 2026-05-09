# SSO Console Theme Proxy - 2026-05-10

## Why This Exists

ZITADEL's supported branding controls apply to Login V2 and email/login branding, but the authenticated Management Console at `/ui/console` keeps its own Angular Material theme. Earlier QA confirmed that `/ui/console` still rendered ZITADEL blue controls even after the instance and organization label policies were configured.

To make the Console visibly follow the Mass Data light visual baseline, this deployment now routes `/ui/console` through a small nginx proxy that injects a stylesheet and a light-theme preference script.

This is a cosmetic wrapper for the vendor Console. It is not a native ZITADEL Console theme.

## Implementation

New Compose service:

- `console-theme`
- Image: `${CONSOLE_THEME_PROXY_IMAGE:-nginx:1.27-alpine}`
- Routes:
  - `/ui/console`
  - `/ui/console-theme`

Files:

- `compose/console-theme/nginx.conf`
- `compose/console-theme/mass-console.css`
- `compose/console-theme/mass-console.js`
- `compose/console-theme/mass-login.css`
- `compose/console-theme/mass-login.js`
- `compose/console-theme/massdata-logo.png`

Traefik routes `/ui/console` and `/ui/console-theme` to `console-theme` with priority `350`, which is higher than the generic ZITADEL catch-all route. The proxy forwards Console requests to `zitadel-api:8080` and injects:

```html
<link rel="stylesheet" href="/ui/console-theme/mass-console.css">
<script src="/ui/console-theme/mass-console.js"></script>
```

The same proxy now also routes `/` and `/ui/v2/login` to the Login V2 container and injects the premium Mass Data login theme. See `docs/SSO-LOGIN-PREMIUM-THEME-2026-05-10.md`.

## Theme Behavior

The injected JavaScript sets:

- `localStorage.theme = light-theme`
- `localStorage.cp-theme = light`
- `documentElement.style.colorScheme = light`

The injected CSS maps common ZITADEL/Angular Material primary variables to the Mass Data gold palette:

- Primary: `#92722a`
- Page background: `#fcfcfc`
- Surface: `#ffffff`
- Text: `#1a1a1a`
- Border: `#d8d2c3`
- Warning: `#b73417`

It also overrides the old ZITADEL/Material blue variables such as:

- `--mat-checkbox-selected-icon-color`
- `--mat-form-field-outlined-focus-outline-color`
- `--mat-slide-toggle-selected-handle-color`
- `--mat-badge-background-color`
- `--mat-slider-handle-color`
- `--mat-progress-spinner-active-indicator-color`

## Live Deployment

Applied on the server under:

```text
/opt/zitadel-compose
```

Deployment actions:

- Backed up the live `docker-compose.yml`.
- Copied the updated `docker-compose.yml`.
- Copied the `console-theme` directory.
- Started `console-theme`.

The existing ZITADEL API container was recreated by Docker Compose during the update and returned healthy.

## Verification

Generated local QA artifacts:

- `.codex-artifacts/sso-visual/console-theme-proxy-2026-05-10/console-theme-proxy-check.json`
- `.codex-artifacts/sso-visual/console-theme-proxy-2026-05-10/console-theme-mobile-check.json`
- `.codex-artifacts/sso-visual/console-theme-proxy-2026-05-10/*.png`

Checked pages:

- `/ui/console/users`
- `/ui/console/instance?id=branding`
- `/ui/console/projects`

Desktop visual audit after injection:

| Page | Theme CSS loaded | Old blue count | Gold count |
|---|---:|---:|---:|
| Users | true | 0 | 53 |
| Instance branding | true | 0 | 33 |
| Projects | true | 0 | 35 |

Mobile `390x844` spot check for Users:

| Page | Theme CSS loaded | Old blue count | Gold count | Scroll width | Client width |
|---|---:|---:|---:|---:|---:|
| Users | true | 0 | 47 | 391 | 390 |

## Known Limitations

- This is a CSS/JS injection layer, not a compiled ZITADEL Console theme.
- Future ZITADEL upgrades can change internal class names or CSS variables and may require retesting this proxy.
- The Console remains a vendor admin UI. For a fully controlled UAE Design System experience, build a separate Mass Data admin portal or a custom ZITADEL Console image.
- Mobile table layouts still inherit some vendor behavior. The visual theme is applied, but the underlying table UX is not redesigned.

## Rollback

To disable the Console theme proxy:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml stop console-theme
```

Then restore the previous `docker-compose.yml` backup or remove the `console-theme` service and Traefik labels from the active Compose file.
