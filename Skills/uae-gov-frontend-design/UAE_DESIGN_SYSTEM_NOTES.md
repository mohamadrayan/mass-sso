# UAE Design System Notes for Agents

Use these official sources before making claims about UAE Design System behavior, package names, class names, component availability, accessibility, login rules, theme customization, typography, breakpoints, or browser support.

Verify current docs and installed package versions inside the repo before coding. If the installed package differs from the docs, prefer the installed package for code and mention the discrepancy.

Key cautions:

- Choose the most specific official UAE asset that fits: use blocks/patterns for complete sections and journeys, components for atomic controls, and custom composition only when no official option fits.
- Do not assume every government surface has a named official component. Verify the current component/block inventory; for tables and detail summaries, use semantic HTML with UAE tokens or mapped blocks/components when no official component exists.
- Before installing `@aegov/design-system-react`, verify the current UAE installation docs and the repo Tailwind version. The standard CSS plugin path and the React package path may have different Tailwind compatibility requirements.
- Do not invent token names. Use verified UAE package tokens or existing repo tokens, then create semantic aliases only through the established theme layer.
- When citing a WCAG version, check both the UAE accessibility and frontend-development pages and apply the stricter/current project policy when they differ.

## Primary Sources

| Topic | Official source | Check before using |
|---|---|---|
| UAE Design System home | https://designsystem.gov.ae/ | Current scope, general positioning, latest docs entry points. |
| Getting started | https://designsystem.gov.ae/docs/getting-started | Core principles, components/blocks/patterns model, support channels. |
| Installation | https://designsystem.gov.ae/docs/installation | Current package names, Tailwind setup, React package guidance, build-tool notes. |
| Tailwind usage | https://designsystem.gov.ae/docs/the-use-of-tailwindcss | Tailwind compatibility, CSS-first setup, `@theme`, plugin usage. |
| Extending configuration | https://designsystem.gov.ae/docs/extending-the-configuration | Token customization, brand colors, default breakpoints, typography defaults, CSS `@theme` guidance. |
| Components | https://designsystem.gov.ae/docs/components | Available components, HTML/React examples, accessibility notes. |
| Blocks | https://designsystem.gov.ae/docs/blocks | Reusable sections such as Header, Footer, Hero, Login, Filter, Page rating. |
| Login | https://designsystem.gov.ae/login | UAE Pass-first authentication rules and approved login layout. |
| Front-end development | https://designsystem.gov.ae/guidelines/frontend-development | Performance, progressive enhancement, component architecture, WCAG expectations. |
| Accessibility | https://designsystem.gov.ae/guidelines/accessibility | Keyboard, focus, ARIA, component accessibility, zoom guidance. |
| Content | https://designsystem.gov.ae/guidelines/content | Tone, clarity, empathy, accessibility-oriented content guidance. |
| Colour system | https://designsystem.gov.ae/guidelines/colour-system | Color tokens and contrast expectations. |
| Typography | https://designsystem.gov.ae/guidelines/typography | Official font families, type scale, responsive typography, line-height, readable text rules. |
| Layout and spacing | https://designsystem.gov.ae/guidelines/layout | Mobile-first layout, containers, grid behavior, spacing, responsive behavior. |
| File input | https://designsystem.gov.ae/docs/components/file-input | Upload component structure, states, accessibility, responsiveness. |
| Steps | https://designsystem.gov.ae/docs/components/steps | Multi-step journey component, states, accessibility, RTL support. |
| Browser support | https://designsystem.gov.ae/docs/browser-support | Browser compatibility and modern CSS feature expectations. |

## Theme, Typography, and Breakpoint Defaults to Verify

Use these as the default contract unless the host repo or installed UAE package has an approved equivalent mapping.

### Brand and theming

- UAE plugin defaults are intended to provide consistent component values.
- Brand customization should happen through the central Tailwind/CSS theme layer where compatible.
- Federal authorities may customize primary and secondary brand colors, but swatches must remain coherent and must not be mixed arbitrarily.
- Component styles should consume primary, secondary, support, surface, text, border, state, and focus tokens instead of hardcoded values.

### Fonts

- English body: Roboto.
- English headings/titles: Inter.
- Arabic body: Noto Kufi Arabic.
- Arabic headings/titles: Alexandria.
- Define fallbacks centrally.
- Do not create extra font names or font stacks inside components.

### Type scale

Use official type classes/tokens where available. Common documented heading sizes include:

- `text-display`: 4.75rem / 76px
- `text-h1`: 3.875rem / 62px
- `text-h2`: 3rem / 48px
- `text-h3`: 2.5rem / 40px
- `text-h4`: 2rem / 32px
- `text-h5`: 1.625rem / 26px
- `text-h6`: 1.25rem / 20px

Common documented content sizes include:

- `text-3xl`: 1.875rem / 30px
- `text-2xl`: 1.5rem / 24px
- `text-xl`: 1.25rem / 20px
- `text-lg`: 1.125rem / 18px
- `text-base`: 1rem / 16px
- `text-sm`: 0.875rem / 14px
- `text-xs`: 0.75rem / 12px

### Breakpoints

Use the documented default breakpoint names unless the repo has an approved equivalent mapping:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

For SCSS or legacy repos, create named variables or mixins rather than raw media query numbers.

## Practical Source Rules

- Do not guess class names. Check the installed package, docs, or examples.
- Do not assume a component exists because another design system has it.
- Do not invent font names, font sizes, color values, spacing values, or breakpoints; check the installed UAE package, repo token files, or official docs.
- If a repo already wraps UAE components, use the wrapper.
- If a source page has changed, follow the current source rather than this notes file.
- For accessibility claims, check the component page and the global accessibility/frontend-development guidelines.
- For theming/rebranding, check extending-configuration, colour-system, and design-token guidance before overriding brand values.
- For typography, check the typography guideline and installed token/classes before using text sizes or font families.
- For responsive behavior, check layout/spacing and the installed breakpoint map before adding media queries.
- For authentication, check the Login block and project policy before adding any non-UAE-Pass route.

## Recommended Repo Files to Inspect

- `package.json` and lockfile for installed UAE package versions.
- `tailwind.config.*`, CSS `@theme`, PostCSS config, or Vite config.
- SCSS token, variable, mixin, or settings files.
- Theme providers, design-token JSON files, or CSS custom property layers.
- Existing typography components, text utilities, or heading components.
- Existing responsive mixins, layout utilities, or container components.
- i18n/translation files and locale formatting utilities.

## Browser Support Checks

Before relying on modern CSS or JavaScript features, compare the project policy and installed UAE Design System browser guidance. Check the official browser support page and the repo browserslist/config. Provide graceful degradation for features that may not be available in supported browsers.

## Related Inspiration

The public Anthropic frontend-design skill emphasizes high-quality, non-generic frontend design. Use that spirit only within UAE Design System constraints: polished, intentional, and distinctive, but never off-brand or non-compliant.

Reference: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md

## Skill Packaging Note

For direct upload as an Agent/Claude Skill, package the ZIP so the root contains the `uae-gov-frontend-design/` folder, and that folder contains `SKILL.md` and this notes file. Do not nest it under an extra `skills/` directory for direct upload.
