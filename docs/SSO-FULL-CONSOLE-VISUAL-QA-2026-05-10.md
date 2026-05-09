# SSO Full Internal Console Visual QA - 2026-05-10

## Scope

This pass performs a broader visual QA of the authenticated ZITADEL Console after the SSO branding work, with specific focus on the system screens requested for review:

- Users
- Organization
- Projects
- Application configuration
- Role assignments
- Actions
- Instance settings and settings subsections

The `uae-gov-frontend-design` skill was used as the review standard. The pass was read-only and non-destructive: navigation, screenshots, DOM/style inspection, focus checks, and axe accessibility checks only.

## Environment

- Target: `https://sso.massdata.ae/ui/console`
- Browser automation: Playwright Chromium
- Date: `2026-05-10`
- Viewports:
  - Desktop: `1440x1000`
  - Mobile: `390x844`
  - Zoom approximation: `823x571` with `body.zoom = 1.75`
- Themes:
  - Light
  - Dark for home, users, and instance settings screens
- Reduced motion: enabled through browser emulation

## Artifacts

Generated local QA artifacts:

- `.codex-artifacts/sso-visual/full-console-qa-2026-05-10/full-console-visual-qa.json`
- `.codex-artifacts/sso-visual/full-console-qa-2026-05-10/axe-key-console-pages.json`
- `.codex-artifacts/sso-visual/full-console-qa-2026-05-10/*.png`

Total coverage:

- Discovered Console routes: `21`
- Screenshot/style cases reviewed: `82`
- Key pages checked with axe: `6`

## Route Inventory Checked

| Area | Route |
|---|---|
| Home | `/ui/console/` |
| Organization | `/ui/console/org` |
| Projects | `/ui/console/projects` |
| Project general | `/ui/console/projects/372207238875447299?id=general` |
| Project roles | `/ui/console/projects/372207238875447299?id=roles` |
| Project grants | `/ui/console/projects/372207238875447299?id=projectgrants` |
| Project default route | `/ui/console/projects/372207238875447299` |
| App configuration | `/ui/console/projects/372207238875447299/apps/372208605262249987?id=configuration` |
| App redirect URIs | `/ui/console/projects/372207238875447299/apps/372208605262249987?id=redirect-uris` |
| App default route | `/ui/console/projects/372207238875447299/apps/372208605262249987` |
| Users | `/ui/console/users` |
| Role assignments | `/ui/console/grants` |
| Actions | `/ui/console/actions` |
| Instance settings default | `/ui/console/instance` |
| Instance branding | `/ui/console/instance?id=branding` |
| Instance features | `/ui/console/instance?id=features` |
| Instance login/security | `/ui/console/instance?id=login` |
| Instance domain settings | `/ui/console/instance?id=domain` |
| Instance events | `/ui/console/instance?id=events` |
| Instance actions | `/ui/console/instance?id=actions` |
| Instance languages | `/ui/console/instance?id=languages` |

## Result

The Login V2 path remains correctly branded, but the authenticated ZITADEL Console system screens are **not fully compliant with the UAE/Mass Data visual design**.

The broader pass confirms the earlier finding:

- All `82` checked Console cases still contain ZITADEL/Angular Material blue styling.
- Most checked pages have `0` Mass Data gold occurrences outside the branding preview/color swatches.
- Instance branding shows the configured gold only inside the preview and color configuration; the surrounding Console shell and action buttons remain blue.
- Mobile and high-zoom layouts have multiple horizontal overflow issues, especially in instance settings and project/app detail screens.
- Keyboard focus exists, but focus styling is browser/default or old Material styling, not a consistent Mass Data/UAE focus treatment.

## Visual Findings

### High - Console shell and controls retain old blue theme

Every checked route still has old blue occurrences. Examples from the style scan:

| Screen | Desktop old blue | Desktop gold | Mobile old blue | Mobile gold |
|---|---:|---:|---:|---:|
| Users | 4 | 0 | 4 | 0 |
| Instance branding | 2 | 2 | 2 | 2 |
| Instance features | 6 | 0 | 6 | 0 |
| Instance login/security | 7 | 0 | 7 | 0 |
| Instance domain settings | 2 | 0 | 2 | 0 |
| Instance events | 1 | 0 | 1 | 0 |
| Instance actions | 2 | 0 | 2 | 0 |
| Instance languages | 2 | 0 | 2 | 0 |
| Project grants | 4 | 0 | 4 | 0 |
| App configuration | 4 | 0 | 4 | 0 |
| App redirect URIs | 4 | 0 | 4 | 0 |

Observed old-theme CSS variables include:

- `--mat-checkbox-selected-icon-color: #2073c4`
- `--mat-form-field-outlined-focus-outline-color: #2073c4`
- `--mat-slide-toggle-selected-handle-color: #2073c4`
- `--mat-badge-background-color: #2073c4`
- `--mat-slider-handle-color: #2073c4`
- `--mat-progress-spinner-active-indicator-color: #2073c4`
- `--mat-stepper-header-selected-state-icon-background-color: #2073c4`
- `--mat-option-selected-state-label-text-color: #2073c4`

### High - Mobile settings pages overflow horizontally

The most visible mobile failures are in the instance settings area. Examples:

| Screen | Viewport | Scroll width | Client width |
|---|---:|---:|---:|
| Instance events, mobile | 390 | 1195 | 390 |
| Instance events, 175 percent zoom | 823 | 2120 | 823 |
| Instance domain, 175 percent zoom | 823 | 1281 | 823 |
| Instance login/security, 175 percent zoom | 823 | 1134 | 823 |
| Instance languages, 175 percent zoom | 823 | 1101 | 823 |
| Project grants, mobile | 390 | 543 | 390 |
| Instance branding, mobile | 390 | 508 | 390 |
| App configuration, mobile | 390 | 455 | 390 |
| App redirect URIs, mobile | 390 | 455 | 390 |

Manual screenshot review confirms large blank horizontal regions and clipped tables/content on mobile settings pages.

### Medium - Users screen is usable but not fully responsive or redesigned

The Users page is readable on desktop, but it remains vendor-styled:

- Active navigation and buttons are blue, not Mass Data gold.
- The table uses fixed columns that clip on mobile.
- The mobile top navigation creates horizontal overflow.
- Focus styling is inconsistent with the UAE/Mass Data visual direction.

### Medium - Settings screen preview is branded, but the settings UI is not

The branding settings page correctly stores and previews:

- Primary color: `#92722a`
- Dark background: `#1a1a1a`
- Dark font: `#fcfcfc`
- Warning color: `#f5ac7c`

However, the actual Console controls around that preview still use ZITADEL's blue Material styling.

## Accessibility Spot Check

Automated axe checks were run on key internal pages:

| Page | Violations | Critical/serious count | Main issue ids |
|---|---:|---:|---|
| Users | 6 | 3 | `button-name`, `label`, `link-name` |
| Instance branding | 4 | 2 | `button-name`, `color-contrast` |
| Instance features | 6 | 3 | `button-name`, `color-contrast`, `link-name` |
| Instance login/security | 5 | 2 | `button-name`, `color-contrast` |
| Projects | 4 | 2 | `button-name`, `link-name` |
| App configuration | 6 | 3 | `button-name`, `link-name`, `listitem` |

These are ZITADEL Console markup/theme issues. They are not introduced by this repository's Compose or nginx configuration.

## Decision

Do not tell reviewers that the internal Console system screens are fully redesigned.

Accurate reviewer wording:

> Login V2 for the application sign-in route is branded and visually verified. The authenticated ZITADEL Console system screens were fully inspected across users, settings, projects, apps, role assignments, actions, desktop, mobile, dark mode, and zoom. They still retain vendor ZITADEL/Angular Material blue styling and have mobile overflow issues. This is a vendor Console limitation, not a completed UAE/Mass Data redesign.

## Recommended Path

Recommended production stance:

- Treat `/ui/console` as a vendor/admin-only surface.
- Do not expose it as a polished Mass Data end-user/admin portal.
- Build a separate Mass Data admin portal for user-facing SSO workflows if full UAE design compliance is required.

Possible only with explicit approval:

- Build a custom ZITADEL Console image from source with a custom Angular Material theme.
- Add a response-rewrite proxy that injects CSS into `/ui/console`.
- Patch static/runtime assets inside the running container.

Those options are brittle compared with a supported portal or a custom Console build, and they should be handled as a separate engineering decision.
