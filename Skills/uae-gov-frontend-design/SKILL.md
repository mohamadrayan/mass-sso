---
name: uae-gov-frontend-design
description: "Use when designing, coding, or reviewing UAE Federal Government web UI with UAE Design System, repo preservation, theming, typography, breakpoints, accessibility, and RTL/LTR."
license: "Internal use only; verify rights before redistribution."
---

# UAE Gov Frontend Design Skill

Skill version: 2.6

## Prime Directive

Create production-grade UAE Federal Government UI that is compliant, mobile-first, accessible, bilingual-ready, performant, visually polished, easy to rebrand, and maintainable in the existing codebase.

The UAE Design System is the controlling authority. If this file conflicts with official UAE Design System documentation or the installed UAE package, follow the official documentation/package and state the discrepancy.

Note: the `version` field in this file is the skill version, not the UAE Design System package or documentation version.

## Decision Order

Apply this order for every UI decision:

1. Preserve host repository architecture and conventions.
2. Use the most specific official UAE Design System asset that fits the need: block, pattern, or component.
3. Keep the experience mobile-first, accessible, RTL/LTR-ready, and localization-safe.
4. Use UAE/repo tokens for color, typography, spacing, states, radius, shadows, motion, and breakpoints.
5. Add custom UI only when no official UAE option fits, and document why.

Never create a separate visual language for UAE federal government work.

## Before Designing or Coding

When implementation depends on UAE package names, class names, component availability, browser support, login rules, accessibility claims, theme customization, typography, or breakpoints, read `UAE_DESIGN_SYSTEM_NOTES.md` before coding.

Briefly determine:

- User type: citizen, resident, visitor, business, or government employee.
- User task and primary action.
- Language mode: English, Arabic, or bilingual.
- UAE component, block, or pattern to use first.
- Existing repo conventions to preserve.
- Existing token/theme, typography, and breakpoint systems to reuse.

Then implement. Do not over-plan.

## Full-Site Redesign Workflow

When asked to apply a new design across pages, treat it as a complete product pass, not a single-page styling task.

1. Inventory every route, page, layout, shell, auth screen, empty state, error state, modal, drawer, table/list view, form step, confirmation page, and shared component affected by the request.
2. Identify the shared layout, theme, token, typography, navigation, form, and component layers that should carry the redesign. Change those first so pages stay consistent.
3. Apply UAE Design System blocks, components, or token mappings across all affected pages. Do not leave old visual patterns on secondary pages, nested states, mobile views, RTL views, or error/empty states.
4. Preserve existing routing, data flow, validation, i18n, and component ownership. Avoid page-by-page one-off CSS when a shared token/component fix is the correct level.
5. Track any page or state that cannot be updated, with the blocker and the exact follow-up required.
6. Before final delivery, run a visual QA pass across the full page inventory and fix issues found. Do not claim the redesign is complete until the checked pages and states are listed.

For large apps, prioritize user-critical journeys first, but still record the full inventory and coverage status.

## Repo Preservation Rule

When working inside an existing project, extend it. Do not replatform it.

Inspect and preserve:

- Framework: Angular, React, Vue, server-rendered templates, or plain HTML.
- Styling: SCSS, CSS modules, Tailwind, tokens, BEM, utilities, or component styles.
- Router, layouts, page structure, and data-fetching conventions.
- Existing design system, component wrappers, or UI primitives.
- Form stack, validation library, and error patterns.
- State management, build, lint, test, Storybook, and accessibility tooling.
- Internationalization and translation workflow.
- Existing theme, typography, and breakpoint contracts.

Do not replace the router, form stack, component conventions, design-token pipeline, or build pipeline just to use the UAE Design System. Make the smallest maintainable change that brings the UI into compliance.

## Preferred Integration, Not Mandatory Replatforming

Use the official UAE Design System packages when compatible with the host repo.

For new or Tailwind-compatible projects, prefer the official plugin:

```css
@layer base;
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "@aegov/design-system";
```

For compatible React projects, use the official React package when appropriate:

```bash
npm install @aegov/design-system-react
```

Before installing `@aegov/design-system-react`, verify the current UAE installation docs and the repo Tailwind version. The standard CSS plugin path and the React package path may have different Tailwind compatibility requirements.

For Angular, Vue, SCSS-heavy, legacy, or enterprise pipelines:

- Preserve the existing stack.
- Integrate UAE styles, tokens, markup, and behavior through existing patterns.
- Prefer adapter/wrapper components over repeated page-level markup.
- Map UAE tokens into existing project tokens where possible.
- Avoid adding Tailwind or React packages unless compatible and justified.
- Use actual current class names and APIs from installed packages or official docs; do not guess.

## Theme and Rebrand Governance

The interface must be easy to theme and rebrand without rewriting components.

Use the host repo's existing theme source of truth when it exists. If none exists, create the smallest compatible central theme layer using the repo's pattern: Tailwind `@theme`, CSS custom properties, SCSS maps, design-token JSON, or typed token objects.

Required model:

1. **System layer**: official UAE Design System tokens/classes or a documented mapping to them.
2. **Entity theme layer**: semantic aliases for entity brand and app surfaces.
3. **Component layer**: components consume semantic tokens/classes, not raw values.

Minimum semantic alias pattern, adapted to the repo naming style. Replace the right-hand side with verified UAE package tokens or existing repo tokens; do not copy variable names that do not exist in the installed project:

```css
:root {
  /* Examples only: map to verified UAE/repo tokens. */
  --brand-primary: var(--color-primary-600);
  --brand-primary-hover: var(--color-primary-500);
  --brand-secondary: var(--color-secondary-900);

  /* Replace placeholders with verified surface, text, and border tokens. */
  --surface-page: var(--verified-page-surface-token);
  --surface-card: var(--verified-card-surface-token);
  --text-default: var(--verified-default-text-token);
  --text-muted: var(--verified-muted-text-token);
  --border-default: var(--verified-border-token);

  --focus-ring: var(--color-primary-600);
}
```

Rules:

- Rebranding should normally change only theme tokens, logos, imagery, and content assets.
- Do not scatter brand values across component CSS, templates, inline styles, or JavaScript.
- Avoid raw `hex`, `rgb`, `hsl`, arbitrary Tailwind values, or one-off SCSS variables when an approved token exists.
- Theme all states: default, hover, focus, active, disabled, selected, error, success, warning, loading, and visited links where relevant.
- If an entity needs a custom primary or secondary color, define a complete compliant swatch/token set rather than replacing only one shade.
- Preserve UAE Design System swatch roles and component expectations; do not casually swap primary and secondary roles.
- Verify contrast for the default state and every interactive state.
- For dark mode, high-contrast, seasonal campaigns, or entity sub-brands, add a theme variant instead of forking components.
- Document any token additions and where they live.

## Typography Governance

Commit to a single approved typography system.

Use official UAE typography tokens/classes or the repo's existing typography tokens mapped to UAE guidance. Do not invent fonts or arbitrary font sizes.

Default UAE font mapping, unless the installed package or host repo has an approved alias:

| Role | English / LTR | Arabic / RTL |
|---|---|---|
| Body/content | Roboto | Noto Kufi Arabic |
| Headings/titles | Inter | Alexandria |

Default UAE type scale to preserve through tokens/classes, unless the installed package or host repo has an approved equivalent:

| Role/class | Size |
|---|---:|
| `text-display` | `4.75rem` / 76px |
| `text-h1` | `3.875rem` / 62px |
| `text-h2` | `3rem` / 48px |
| `text-h3` | `2.5rem` / 40px |
| `text-h4` | `2rem` / 32px |
| `text-h5` | `1.625rem` / 26px |
| `text-h6` | `1.25rem` / 20px |
| `text-3xl` | `1.875rem` / 30px |
| `text-2xl` | `1.5rem` / 24px |
| `text-xl` | `1.25rem` / 20px |
| `text-lg` | `1.125rem` / 18px |
| `text-base` | `1rem` / 16px |
| `text-sm` | `0.875rem` / 14px |
| `text-xs` | `0.75rem` / 12px |

Rules:

- Use approved font-family tokens only. Do not introduce unsupported font names in components.
- Keep Arabic and English font stacks source-managed and consistent.
- Define or reuse named text roles: `display`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body`, `lead`, `label`, `caption`, `helper`, `table`, and `button`.
- Use tokenized `font-size`, `line-height`, `font-weight`, and `letter-spacing` values.
- Prefer `rem`-based sizing. Avoid raw `px` font sizes unless the design system uses them internally.
- Keep default body text at a readable size; do not shrink normal content below the approved scale.
- Use responsive heading rules from the UAE Design System or the repo's approved typography mixins.
- Test Arabic text expansion, line wrapping, and vertical rhythm before reducing sizes.
- Never shrink legal, eligibility, fee, warning, or error text just to fit a layout.
- If the repo already has typography names, map UAE roles to existing names and document the mapping instead of renaming everything.

## Breakpoint and Responsive Governance

Use a predefined responsive scale to avoid layout mayhem.

Default UAE/Tailwind breakpoint scale, unless the host repo already has an approved equivalent:

| Token | Min width | Use |
|---|---:|---|
| Base | 0px | Mobile-first default; no media query. |
| `sm` | `640px` | Large phones and small tablets. |
| `md` | `768px` | Tablets and simple two-column layouts. |
| `lg` | `1024px` | Desktop layout changes and sidebars. |
| `xl` | `1280px` | Wide desktop containers and dashboards. |
| `2xl` | `1536px` | Very wide screens; avoid major unique behavior. |

Rules:

- Write mobile styles first.
- Use only approved breakpoint tokens, configured Tailwind screens, CSS custom properties, or repo mixins.
- Do not add random media query values such as `700px`, `900px`, `917px`, or `1100px` in component files.
- Centralize breakpoints in Tailwind config/`@theme`, CSS custom properties, SCSS maps, or repo mixins.
- In SCSS-heavy projects, prefer named mixins such as `@include mq(md)` over raw media queries.
- Use container queries for reusable components when viewport breakpoints are the wrong abstraction, but keep container thresholds intentional and documented.
- Add a new breakpoint only when there is a repeated product need, no existing token fits, and the addition is documented in the central scale.
- Do not use breakpoints to fix content problems that should be solved through wrapping, hierarchy, or shorter localized copy.
- Verify key screens at mobile, tablet, desktop, and wide desktop sizes.

## Design Intent

Good UAE government UI should feel official, calm, credible, clear, service-oriented, modern, polished, and intentional.

Avoid generic AI-looking UI. Do not add random gradients, glassmorphism, abstract blobs, neon colors, unsupported fonts, heavy motion, custom cursors, or decorative effects that reduce clarity.

Creativity means better hierarchy, spacing, flow, content clarity, states, and restrained details inside UAE Design System rules.

## Example Trigger Prompts

Use this skill for prompts like:

- Build a UAE Federal Government service landing page in this repo.
- Review this form for UAE Design System compliance, RTL, Arabic text expansion, and accessibility.
- Refactor this login page to follow UAE Pass-first authentication guidance.
- Create a mobile-first multi-step government application form using UAE components.
- Convert this page to preserve the existing Angular/SCSS stack while aligning it with UAE Design System rules.
- Rebrand this government service UI using the approved entity token layer without changing component CSS.

## UAE Component, Block, and Pattern Priority

Use the most specific official UAE asset that directly fits the problem:

1. Official UAE Design System block or pattern when it covers the whole section, journey, or layout need.
2. Official UAE Design System component for atomic controls and smaller UI pieces.
3. Custom composition using UAE tokens/classes and existing repo components.
4. Custom CSS/component only when no official option fits.

Examples:

- Use the official Login block for login rather than composing a custom login card from Button, Card, and Input pieces.
- Use official form-field components, Steps, File Input, Alert, Pagination, Filter block, Card, and Content block where they fit; for tables and detail summaries, use semantic HTML with UAE tokens or the mapped official blocks/components.
- Compose custom service surfaces only after checking whether an official block, pattern, or component already solves the need.

Do not remove official component structure, accessibility notes, or behavior.

## Fallback Rule for Missing Components

If the UAE Design System lacks a needed component:

- Compose from official UAE components first.
- Use UAE/repo tokens for color, typography, spacing, radius, border, shadow, motion, breakpoints, and states.
- Keep the component visually restrained and consistent with adjacent official components.
- Use semantic HTML and accessible interaction patterns.
- Support mobile, RTL/LTR, keyboard, high zoom, and reduced motion.
- Name it as a local project component, not as an official UAE component.
- Document why it is custom, which official components it composes, and what risks remain.
- Add tests, stories, or examples when the repo has those conventions.

Never invent new brand colors, icon styles, motion language, breakpoints, or typography for a fallback.

## Mobile-First Rules

Default styles are for mobile. Enhance progressively for larger screens.

- Avoid desktop-first CSS and fixed widths on small screens.
- Use responsive grids, flexbox, and container queries when compatible.
- Use the approved breakpoint contract for viewport changes.
- Keep touch targets comfortable.
- Prioritize form completion, login, search, navigation, and service-start actions.
- Keep primary actions visible without covering content.

## RTL, Arabic, and Localization Rules

All layouts must work in `dir="ltr"` and `dir="rtl"`.

Use logical properties such as `padding-inline`, `margin-inline-start`, `border-inline-end`, and `inset-inline-start`. Avoid left/right assumptions.

Localization requirements:

- Use the repo i18n system; do not hardcode bilingual strings inside components.
- Test Arabic text expansion in buttons, labels, nav, cards, tables, errors, and step labels.
- Avoid truncating legal, regulatory, fee, eligibility, deadline, or error content.
- Prefer wrapping over ellipsis for critical text.
- Use locale-aware date, time, number, and currency formatting.
- Follow project policy for Arabic-Indic vs Latin numerals; do not mix inconsistently.
- Do not concatenate translated strings; use full translation keys with variables.
- Mirror directional icons only when their meaning depends on direction.
- Test Arabic forms, breadcrumbs, navigation, tables, modals, uploads, and multi-step flows.

## Accessibility Rules

Accessibility is mandatory.

When citing a WCAG version, check the current UAE accessibility and frontend-development pages and apply the stricter/current project policy when they differ.

- Use semantic HTML.
- Use official component HTML structures where provided.
- Preserve visible focus states.
- Support full keyboard navigation.
- Use ARIA only when needed; use required ARIA for interactive components.
- Use `button` for actions and `a` for navigation.
- Do not rely on color alone for meaning.
- Respect reduced motion.
- Ensure text, spacing, layout, and overlays do not break at high zoom.

## Forms and Long Regulatory Workflows

Forms must be easy to complete on mobile and safe for long government processes.

Required:

- Visible label for every input.
- Clear required/optional status.
- Actionable inline errors near fields.
- Validation summary near the top for multi-error submissions.
- UAE patterns for Emirates ID, names, dates, addresses, contact numbers, and currency when relevant.
- Steps/progress for multi-step services.
- Review page before final submission when the workflow is consequential.
- Confirmation after submission with reference number where applicable.
- Critical help text visible or immediately adjacent, not hidden behind hover.

For long workflows:

- Support save/resume or draft state when lengthy or document-heavy.
- Warn before session timeout or data loss.
- Use sticky mobile primary actions only when they do not cover fields or errors.
- Separate Previous, Save draft, Continue, Submit, and Cancel actions clearly.
- Place inline help close to the field it explains.
- For attachments, state formats, max size, file count, naming guidance, and upload status.
- Show uploaded files with remove/replace controls and accessible names.
- Prefill known data from UAE Pass where allowed and safe.

## Login and UAE Pass

For federal UAE government authentication flows:

- Use the official UAE Design System login guidance.
- Treat UAE Pass as the primary sign-in route unless approved project requirements say otherwise.
- Do not visually demote UAE Pass.
- Do not introduce alternate login methods unless approved.
- Keep login simple, mobile-first, keyboard-accessible, and screen-reader friendly.

## Component Mapping Appendix

Use this mapping before inventing UI.

| Surface | UAE-first mapping | Notes |
|---|---|---|
| Login/authentication | Login block, Button | UAE Pass primary; other methods require approval. |
| Service cards | Card, Badge, Button, Hyperlink | Name, status/eligibility, short description, one clear action. |
| Multi-step forms | Steps, Input, Select, Radio, Checkbox, Textarea, Alert | Progress, validation summary, save/resume, review before submit. |
| Uploads | File Input, Alert, Button | Formats, size limits, status, remove/replace actions. |
| Tables/lists | Existing table or custom accessible table with UAE tokens; Pagination; Filter block | Use semantic `<table>` for tabular data. Preserve meaning on mobile. |
| Detail summaries | Card, Content block, Badge, Breadcrumbs | Prefer definition lists for label/value pairs. |
| Confirmation pages | Alert, Card/Content block, Button/Hyperlink | Outcome, reference number, next steps, print/download if relevant. |
| Empty states | Card/Content block, Button/Hyperlink | Explain what is empty, why, and the next useful action. |
| Error pages | Alert/Banner, Button/Hyperlink, Content block | Problem, recovery action, help option, status code if useful. |
| Search/filter | Input, Button, Filter block, Pagination | Accessible, resettable, usable on mobile. |
| Navigation | Header, Footer, Navigation, Breadcrumbs | Keyboard, focus, skip links, RTL behavior. |

If a mapped official component does not exist in the installed version, follow the fallback rule.

## Performance and Code Quality

Government services must work on slow networks and older devices.

- Keep bundles small and avoid unnecessary dependencies.
- Lazy-load routes and heavy UI.
- Optimize images and use responsive sources.
- Avoid unnecessary animation libraries.
- Monitor Core Web Vitals where tooling exists.
- Provide usable fallbacks for progressive enhancement failures.
- Keep selectors simple and avoid `!important` unless unavoidable.
- Use tokens, CSS custom properties, or theme values.
- Run a token audit: no raw brand colors, arbitrary font sizes, arbitrary breakpoints, or one-off spacing unless justified.
- Keep typography and responsive behavior tied to the typography and breakpoint contracts.
- Keep components reusable and typed when using TypeScript.
- Include default, hover, focus, active, disabled, loading, error, and success states.
- Use real content structure, not lorem ipsum, unless requested.

## Verification Checklist

Before finalizing UI work, verify or state what could not be verified.

Required checks:

- Full-page screenshot review for every updated route at mobile, tablet, desktop, and wide desktop where feasible.
- Before/after or final screenshot evidence for key journeys, including the app shell and at least one representative form/list/detail/error state.
- Mobile viewport around 360px and 390px wide.
- Tablet and desktop layout at approved breakpoints.
- RTL toggle with `dir="rtl"` and Arabic or pseudo-Arabic content.
- LTR check with `dir="ltr"`.
- Keyboard-only pass: Tab, Shift+Tab, Enter, Space, Esc, and arrows where relevant.
- Visible focus on all interactive elements.
- Browser zoom at the official 175% check and internal 200% check without overlapping, clipped, or hidden critical content.
- Reduced-motion check with `prefers-reduced-motion: reduce`.
- Browser support/browserslist checked against the installed UAE Design System version and project policy.
- Theme/rebrand check: UI still works when core semantic tokens change.
- Typography check: no unauthorized font families, raw font sizes, or inconsistent heading/text styles.
- Breakpoint check: media queries use the approved central breakpoint scale or are documented exceptions.
- Graceful degradation/fallback behavior checked for unsupported CSS or JS features.
- Automated accessibility pass such as axe, Lighthouse, Playwright axe, Cypress axe, or pa11y when available.
- Form validation with empty, invalid, and valid submissions.
- Arabic text expansion for labels, buttons, cards, tables, and errors.
- Visual regression scan for overlap, clipping, unintended scrollbars, old-theme remnants, inconsistent spacing, broken icons/images, low-contrast states, and content hidden behind sticky elements.

Target: no critical or serious automated accessibility violations. Document remaining issues.

## Output Contract

When delivering implementation, include:

- What changed.
- Page/route inventory covered by the redesign and any uncovered pages/states.
- Visual QA evidence produced, such as screenshot paths, viewport matrix, browser used, and issues fixed.
- UAE components, blocks, or patterns used.
- Existing repo conventions preserved.
- Assumptions made.
- Theme/rebrand tokens added, changed, preserved, or mapped.
- Typography tokens, font aliases, and type-scale choices used or preserved.
- Responsive behavior implemented, including breakpoint and container-query choices.
- Browser support or graceful-degradation considerations.
- RTL/LTR and localization behavior implemented.
- Accessibility checks performed and results.
- Remaining accessibility or UX risks.
- Custom fallback components added and why.
- Verification not performed, if any, with a clear reason.

## Hard Do-Nots

Do not:

- Replatform the frontend unnecessarily.
- Replace official UAE components with custom replicas.
- Remove official accessibility HTML or ARIA.
- Hardcode colors, spacing, typography, radius, shadows, motion, font names, font sizes, or breakpoints when tokens/classes exist.
- Introduce random font names, font sizes, line heights, or media-query breakpoints outside the approved token system.
- Build only for English or only for LTR.
- Use desktop-first layouts.
- Hide focus outlines.
- Use hover-only interactions.
- Add unapproved alternate login methods.
- Mix Dubai Design System rules into UAE Federal Government pages unless explicitly required.
- Produce a generic template that could belong to any brand.

## Final Self-Check

Before answering, verify:

- Host repo stack and conventions were preserved.
- UAE Design System was used first.
- Mobile works first.
- RTL/LTR works.
- Arabic/English content can fit.
- Keyboard navigation works.
- Focus is visible.
- 175% and 200% zoom do not break critical content.
- Reduced motion is respected.
- Automated accessibility was run or marked not run.
- Colors, spacing, typography, radius, states, and brand values are token-based.
- The approved font family and type scale are used consistently.
- The approved breakpoint map is used consistently.
- The primary action is obvious.
- Forms have labels, help, validation, and summaries.
- Long workflows support save/resume where needed.
- Performance is considered.
- Browser support and graceful degradation are considered.
- The design is polished but still official.

## Source Notes

Use the companion `UAE_DESIGN_SYSTEM_NOTES.md` file for official sources, source-check rules, browser-support references, and what to verify before implementation. Official documentation and installed package behavior win over this file.
