# SSO Premium Login Theme - 2026-05-10

## Scope

This change upgrades the ZITADEL Login V2 surface from a plain vendor login card to a premium branded Mass Data SSO experience.

The design keeps the underlying ZITADEL authentication flow intact and applies the visual layer through the existing `console-theme` nginx proxy.

## Design Direction

Research inputs:

- Modern Gemini-style interfaces emphasize a clean surface, restrained visual hierarchy, soft light-mode backgrounds, and fewer distracting controls.
- High-end enterprise login UX favors simple forms, visible trust/security cues, clear focus states, and mobile-first accessibility.
- The UAE design skill requires a calm, official, mobile-first, accessible experience with tokenized colors and no generic decorative clutter.
- The official Mass Data public brand uses a red technology mark and a digital transformation/security positioning, so the SSO surface uses red as the identity signal and gold as the official premium action/focus accent.

Applied design choices:

- Light-mode product baseline with a premium dark identity panel.
- Official Mass Data logo from `https://massdata.ae/assets/img/logo.png`, copied into the repo as `compose/console-theme/massdata-logo.png`.
- Large branded left/upper panel with:
  - Mass Data logo.
  - `Identity Command` heading.
  - network/identity-control visual.
  - SSO, OIDC, and adaptive-risk signal cards.
  - security chips.
  - access metrics.
  - online identity signal.
- Clean login card with Mass Data welcome copy.
- Gold primary action and focus treatment.
- Mobile layout stacks the brand panel above the form.

The design intentionally avoids changing the underlying login form, validation flow, language selector, password step, or ZITADEL routing. It is a visual brand layer only.

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
<link rel="stylesheet" href="/ui/login-theme/mass-login.css?v=20260510m">
<script src="/ui/login-theme/mass-login.js?v=20260510g"></script>
```

The injected script:

- Forces light theme preference.
- Adds the Mass Data brand panel.
- Adds the Identity Command visual system and metrics.
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

- `.codex-artifacts/sso-visual/login-premium-2026-05-10/login-fix-wide1-qa.json`
- `.codex-artifacts/sso-visual/login-premium-2026-05-10/*.png`

Checked states:

- Login name step.
- Password step.
- Desktop `1440x1000`.
- Mobile `390x844`.
- Mobile `360x800`.
- Browser dark preference forced back to the light branded baseline.
- Reduced motion.
- Desktop axe scan.

Result summary:

| Case | Brand panel | Visual system | Metrics | Logo loaded | Old blue | Horizontal overflow | Clipped UI |
|---|---:|---:|---:|---:|---:|---:|---:|
| Desktop login | true | true | 3 | true | 0 | none | 0 |
| Desktop password | true | true | 3 | true | 0 | none | 0 |
| Mobile 390 login | true | true | 3 | true | 0 | none | 0 |
| Mobile 360 login | true | true | 3 | true | 0 | none | 0 |

Follow-up polish after visual review:

- Rebalanced the desktop split so the left brand panel owns roughly half the screen and no longer looks undersized on wide monitors.
- Restored the stronger `Identity Command` hero message.
- Removed the desktop extra vertical scroll caused by the vendor root layout.
- Turned the right-side ZITADEL form into one clean premium access card instead of nested cards.
- Verified login and password states at wide desktop `2048x1152`, desktop `1440x1000`, mobile `390x844`, and mobile `360x800` with no old blue, no horizontal overflow, and no clipped controls. Wide and desktop viewports have no vertical scroll.

Automated accessibility findings remaining from vendor Login V2 markup:

- `html-has-lang`
- `landmark-one-main`
- `region`

These existed in prior Login V2 checks and are not caused by the Mass Data theme overlay.

## UAE Design System Fit

This repo does not own the ZITADEL Login V2 React application, so the official UAE Design System package is not installed into the login application and component-level replacement is not available here.

The implemented overlay follows the local UAE design skill by preserving the host architecture, keeping the authentication journey unchanged, using a mobile-first responsive layout, maintaining a calm official light-mode baseline, avoiding vendor-blue leftovers, and documenting the custom brand tokens in one CSS layer instead of scattering values through the app.

## Notes

This is still a theme overlay around a vendor-managed ZITADEL Login V2 application. It is suitable for the current deployment, but ZITADEL upgrades should retest the visual selectors and injected markup.
