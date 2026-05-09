# SSO Design QA - 2026-05-09

## Scope

Applied the UAE government visual direction to the live ZITADEL SSO branding using ZITADEL's official branding controls and project private-labeling behavior.

Covered live surfaces:

- Instance default branding.
- `Mass AI` project branding setting.
- `Mass AI Core` OIDC login request through ZITADEL Login V2.
- Login name step, password step, disabled empty state, light mode, dark mode, mobile, tablet, desktop, wide desktop, keyboard focus, forced RTL, and zoom checks.

Not covered as a redesign target:

- ZITADEL Management Console admin shell. This is a vendor admin UI and should not be treated as the end-user SSO login surface. The default `ZITADEL` project was not changed because ZITADEL documents it as the default project for the Management Console and APIs.

## Live Branding Applied

Light mode:

- Background: `#FCFCFC`
- Primary: `#92722A`
- Warning: `#B73417`
- Font: `#1A1A1A`

Dark mode:

- Background: `#1A1A1A`
- Primary: `#92722A`
- Warning: `#F5AC7C`
- Font: `#FCFCFC`

Project setting:

- `Mass AI` private labeling: `Use project setting`

Login V2 routing/header fix:

- Added `x-zitadel-public-host` and `x-zitadel-instance-host` to `CUSTOM_REQUEST_HEADERS` for the `zitadel-login` service.
- Recreated only `zitadel-login`; the container returned healthy.

## Visual QA Evidence

Local screenshot/report artifacts were generated under:

- `.codex-artifacts/sso-visual/mass-ai-final-qa/visual-qa-report.json`
- `.codex-artifacts/sso-visual/mass-ai-final-qa/*.png`

Viewport and state matrix:

- Mobile: `360x800`, `390x844`
- Tablet: `768x1024`
- Desktop: `1440x1000`
- Wide desktop: `1536x1100`
- Light and dark login name screens
- Light password screen
- Empty login disabled state
- Keyboard focus state
- Forced `dir="rtl"` layout check
- 175% and 200% zoom checks

Result summary:

- `Mass AI Core` real auth request uses the UAE gold primary button after the header fix.
- Automated style audit found `oldBlue=0` on checked `Mass AI Core` login states.
- Primary button contrast measured `4.66:1`.
- Light body contrast measured `16.96:1`.
- Light warning contrast measured `5.82:1`.
- Dark body contrast measured `16.96:1`.
- Dark warning contrast measured `9.18:1`.
- Empty login form disables `Continue`, preventing invalid submit.
- Keyboard focus is visible.
- Mobile and desktop screenshots showed no obvious overlap, clipping, or unintended horizontal scrolling on the checked login states.

## Accessibility Findings

`axe` still reports issues in the ZITADEL Login V2 generated markup:

- `html-has-lang`
- `landmark-one-main`
- `region`
- `autocomplete-valid` on password step
- `link-name` on password step
- One `color-contrast` finding on password step

These are vendor/Login V2 markup issues, not introduced by the branding values or Compose header fix. They should be tracked separately if strict accessibility closure is required.

## Assumptions and Limits

- No official Mass Data logo or approved bilingual content asset was available in the repo, so no logo or custom font was uploaded.
- Arabic language content was not configured in ZITADEL during this pass. The forced RTL check verifies layout mirroring only, not Arabic copy quality.
- The ZITADEL Console preview uses the branding controls correctly, but the real Login V2 route needed the proxy/header correction before the branding appeared on end-user auth requests.
