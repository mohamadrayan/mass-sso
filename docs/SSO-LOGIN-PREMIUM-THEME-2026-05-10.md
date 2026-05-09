# SSO Premium Login Theme - 2026-05-10

## Scope

This change upgrades the ZITADEL Login V2 surface from a plain vendor login card to a branded Mass Data SSO experience.

The design keeps the underlying ZITADEL authentication flow intact and applies the visual layer through the existing `console-theme` nginx proxy.

## Design Direction

Research inputs:

- Modern Gemini-style interfaces emphasize a clean surface, restrained visual hierarchy, soft light-mode backgrounds, and fewer distracting controls.
- Current login UX guidance favors simple forms, visible trust/security cues, clear focus states, and mobile-first accessibility.
- The UAE design skill requires a calm, official, mobile-first, accessible experience with tokenized colors and no generic decorative clutter.

Applied design choices:

- Light premium baseline.
- Official Mass Data logo from `https://massdata.ae/assets/img/logo.png`, copied into the repo as `compose/console-theme/massdata-logo.png`.
- Large branded left/upper panel with:
  - Mass Data logo.
  - `Secure Intelligence Access` heading.
  - short trust copy.
  - security chips.
  - online identity signal.
- Clean login card with Mass Data welcome copy.
- Gold primary action and focus treatment.
- Mobile layout stacks the brand panel above the form.

## Implementation

Files:

- `compose/console-theme/mass-login.css`
- `compose/console-theme/mass-login.js`
- `compose/console-theme/massdata-logo.png`
- `compose/console-theme/nginx.conf`
- `compose/docker-compose.yml`

Routes:

- `/`
- `/ui/v2/login`
- `/ui/login-theme`

The proxy injects:

```html
<link rel="stylesheet" href="/ui/login-theme/mass-login.css?v=20260510d">
<script src="/ui/login-theme/mass-login.js?v=20260510c"></script>
```

The injected script:

- Forces light theme preference.
- Adds the Mass Data brand panel.
- Updates headline/supporting copy.
- Adds form trust text.
- Classifies primary, back, and register buttons so the visual treatment does not accidentally style secondary actions as primary.

## Live Deployment

Applied on the server under:

```text
/opt/zitadel-compose
```

Deployment actions:

- Backed up the live `docker-compose.yml`.
- Copied the updated Compose file.
- Copied `mass-login.css`, `mass-login.js`, `massdata-logo.png`, and the updated nginx config.
- Recreated/restarted only `console-theme`.

No database changes were made.

## Visual QA

Generated local artifacts:

- `.codex-artifacts/sso-visual/login-premium-2026-05-10/premium-login-final-qa.json`
- `.codex-artifacts/sso-visual/login-premium-2026-05-10/*.png`

Checked states:

- Login name step.
- Password step.
- Desktop `1440x1000`.
- Mobile `390x844`.
- Mobile `360x800`.
- Wide desktop `1536x1100`.
- Browser dark preference.
- Reduced motion.
- Desktop axe scan.

Result summary:

| Case | Brand panel | Logo loaded | Old blue | Horizontal overflow |
|---|---:|---:|---:|---:|
| Desktop login | true | true | 0 | none |
| Desktop password | true | true | 0 | none |
| Mobile 390 login | true | true | 0 | none |
| Mobile 390 password | true | true | 0 | none |
| Mobile 360 login | true | true | 0 | none |
| Wide login | true | true | 0 | none |
| Dark preference login | true | true | 0 | none |

Automated accessibility findings remaining from vendor Login V2 markup:

- `html-has-lang`
- `landmark-one-main`
- `region`

These existed in prior Login V2 checks and are not caused by the Mass Data theme overlay.

## Notes

This is still a theme overlay around a vendor-managed ZITADEL Login V2 application. It is suitable for the current deployment, but ZITADEL upgrades should retest the visual selectors and injected markup.
