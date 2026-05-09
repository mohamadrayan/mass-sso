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
<link rel="stylesheet" href="/ui/console-theme/mass-console.css?v=20260510j">
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

## Iterative Visual QA Follow-up

An additional full-console visual pass was run after the premium Login V2 redesign to improve consistency across internal screens.

Updated Console theme improvements:

- Raised the Console shell from a simple recolor to a polished light Mass Data baseline.
- Added warmer page surfaces, elevated cards, cleaner button states, table row hover, and consistent gold focus rings.
- Fixed the outlined-button state where `Learn More` could appear as gold text on a gold background.
- Removed public page-level horizontal overflow on mobile.
- Converted mobile tables into compact stacked cards for admin pages such as Users, Role Assignments, Actions, and Events.
- Hid heavy audit columns such as payload/resource owner/sequence on mobile where they broke layout; desktop remains unchanged.
- Kept the top navigation horizontally scrollable on mobile instead of forcing the whole page wider.

Final artifact set:

- `.codex-artifacts/sso-visual/iterative-console-2026-05-10/console-final.json`
- `.codex-artifacts/sso-visual/iterative-console-2026-05-10/*-final.png`
- `.codex-artifacts/sso-visual/iterative-console-2026-05-10/instance-events-mobile390-r6-scroll900.png`

Final checked routes:

- `/ui/console/`
- `/ui/console/users`
- `/ui/console/projects`
- `/ui/console/org`
- `/ui/console/grants`
- `/ui/console/actions`
- `/ui/console/instance`
- `/ui/console/instance?id=branding`
- `/ui/console/instance?id=login`
- `/ui/console/instance?id=domain`
- `/ui/console/instance?id=events`
- `/ui/console/instance?id=languages`

Final visual scan summary:

| Scope | Checked pages | Desktop old blue | Desktop overflow | Mobile old blue | Mobile page overflow |
|---|---:|---:|---:|---:|---:|
| Console final pass | 12 | 0 on all | 0 on all | 0 on all | 0 on all |

The Events page was also checked after scrolling on mobile because the audit table sits below the initial instance summary. The table renders as stacked cards without widening the page.

## Known Limitations

- This is a CSS/JS injection layer, not a compiled ZITADEL Console theme.
- Future ZITADEL upgrades can change internal class names or CSS variables and may require retesting this proxy.
- The Console remains a vendor admin UI. For a fully controlled UAE Design System experience, build a separate Mass Data admin portal or a custom ZITADEL Console image.
- Mobile table layouts are improved through CSS, but they are still a vendor Console adaptation rather than a native Mass Data admin-table component.

## Rollback

To disable the Console theme proxy:

```bash
cd /opt/zitadel-compose
docker compose --env-file .env -f docker-compose.yml stop console-theme
```

Then restore the previous `docker-compose.yml` backup or remove the `console-theme` service and Traefik labels from the active Compose file.
