# SSO Internal Console Visual QA - 2026-05-10

## Scope

This pass checked whether the UAE government branding is applied across authenticated/internal ZITADEL Console pages after the live SSO branding work.

The UAE Design System skill was applied as the review standard:

- Preserve the existing ZITADEL deployment and avoid replatforming.
- Use official ZITADEL branding/private-labeling controls first.
- Verify full-page screenshots across desktop, dark mode, and mobile where feasible.
- Track any page/state that cannot be brought into the new design through supported controls.

## Branding Controls Applied

The live ZITADEL instance now has:

- Instance default branding configured.
- `Mass Data` organization custom label policy configured and activated.
- `Mass AI` project private labeling set to `Use project setting`.
- `Mass AI Core` Login V2 route verified with the UAE gold primary color.

Organization branding API verification returned:

- `resourceOwnerType`: `RESOURCE_OWNER_TYPE_ORG`
- Light primary: `#92722A`
- Light background: `#FCFCFC`
- Light warning: `#B73417`
- Light font: `#1A1A1A`
- Dark primary: `#92722A`
- Dark background: `#FCFCFC`
- Dark warning: `#B73417`
- Dark font: `#1A1A1A`
- Theme mode: `THEME_MODE_LIGHT`
- `disableWatermark`: `true`

The `2026-05-10` follow-up intentionally makes the default branding baseline light mode, not automatic dark/light switching, so reviewers can see the Mass Data styling change clearly under normal browser settings.

## Internal Console Route Inventory Checked

Desktop light and desktop dark:

- `/ui/console/`
- `/ui/console/org`
- `/ui/console/projects`
- `/ui/console/projects/372207238875447299?id=general`
- `/ui/console/projects/372207238875447299?id=roles`
- `/ui/console/projects/372207238875447299?id=projectgrants`
- `/ui/console/projects/372207238875447299/apps/372208605262249987?id=configuration`
- `/ui/console/projects/372207238875447299/apps/372208605262249987?id=redirect-uris`
- `/ui/console/users`
- `/ui/console/grants`
- `/ui/console/actions`
- `/ui/console/instance?id=branding`
- `/ui/console/instance?id=features`
- `/ui/console/instance?id=login`
- `/ui/console/instance?id=domain`
- `/ui/console/instance?id=events`
- `/ui/console/instance?id=actions`
- `/ui/console/instance?id=languages`

Mobile spot checks at `390x844`:

- Home
- Organization
- Projects
- Users
- Actions
- Instance branding

## Visual QA Evidence

Generated local artifacts:

- `.codex-artifacts/sso-visual/console-internal-qa/console-internal-visual-qa.json`
- `.codex-artifacts/sso-visual/console-internal-qa/*.png`

Total checks: `42`

Viewport coverage:

- Desktop light: `1440x1000`
- Desktop dark: `1440x1000`
- Mobile light: `390x844`

## Result

The internal ZITADEL Console is **not fully applying the UAE branding** through official branding controls.

Observed:

- Login V2 for `Mass AI Core` correctly uses the UAE gold primary color.
- The Console branding settings page preview correctly shows the configured UAE colors.
- The actual authenticated Console shell still uses ZITADEL/Material blue on navigation, primary buttons, links, focus states, checkboxes, tabs, sliders, and form focus outlines.

Automated style scan result:

- Every checked Console route still had old blue occurrences.
- Most Console routes had `0` gold occurrences outside the branding preview page.
- The `instance-branding` page showed gold only inside the preview/configured color swatches, while the Console chrome and Apply button stayed blue.

Examples:

- Home, light: `oldBlue=8`, `gold=0`
- Organization, light: `oldBlue=4`, `gold=0`
- Projects, light: `oldBlue=3`, `gold=0`
- Actions, light: `oldBlue=6`, `gold=0`
- Instance branding, light: `oldBlue=2`, `gold=2`
- Home, dark: `oldBlue=8`, `gold=0`
- Actions, dark: `oldBlue=6`, `gold=0`

Mobile layout findings:

- Home at `390x844` had horizontal overflow: `scrollW=406`, `clientW=390`.
- Instance branding at `390x844` had horizontal overflow: `scrollW=508`, `clientW=390`.

## Technical Finding

The Console page exposes hardcoded/default Angular Material CSS variables that remain blue after the official label policy is applied, for example:

- `--mat-checkbox-selected-icon-color: #2073c4`
- `--mat-form-field-outlined-focus-outline-color: #2073c4`
- `--mat-slide-toggle-selected-handle-color: #2073c4`
- `--mat-badge-background-color: #2073c4`
- `--mat-slider-handle-color: #2073c4`
- `--mat-progress-spinner-active-indicator-color: #2073c4`

Because the Console UI is served from the ZITADEL binary/container and not from this repository, there is no repo-native Angular/CSS theme layer to update safely.

## Decision

Do not claim that the internal Console pages are fully redesigned.

Supported and completed:

- Official instance branding.
- Official organization branding.
- Official project private-labeling setting.
- Login V2 visual QA for the actual `Mass AI Core` OIDC route.

Not completed through supported controls:

- Full authenticated ZITADEL Console retheme.

## Options to Close the Gap

Recommended:

- Keep ZITADEL Console as an admin/vendor surface.
- Do not expose Console as the end-user internal application.
- Build or use a separate Mass Data internal portal for user-facing SSO/admin workflows, using the UAE Design System directly.

Possible but not recommended without explicit approval:

- Build a custom ZITADEL Console image from source with a UAE Material theme.
- Add a response-rewrite proxy that injects CSS into `/ui/console`. This is brittle and can break on ZITADEL upgrades.
- Patch static/runtime assets inside the running container. This is not durable across container recreation and should not be treated as production-ready.

## Reviewer Note

The design is correctly applied to the hosted Login V2 path used by `Mass AI Core`. The authenticated ZITADEL Management Console remains partially vendor-themed despite official label policies, and should be reviewed as an unresolved vendor/admin-console limitation rather than as completed design work.
