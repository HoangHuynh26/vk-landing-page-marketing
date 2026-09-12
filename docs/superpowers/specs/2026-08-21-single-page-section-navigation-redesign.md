# Single-page section navigation and visual redesign

## Goal

Convert the site from route-based navigation to a single landing page and refine the hero, strategy, and case-study sections for tighter spacing, clearer hierarchy, and purposeful interaction.

## Navigation architecture

- Render the landing page directly from `index.js` without `BrowserRouter`, `Routes`, or `Outlet`.
- Navbar links use same-page anchors for `#strategy`, `#case-studies`, `#faq`, and `#lead-form`.
- Add matching section IDs to the home-page sections.
- Preserve mobile menu behavior, language switching, CTA navigation, and accessible focus styles.

## Hero

- Keep video full-bleed at `100svh` using `object-fit: cover`.
- Use a layered gradient overlay so text remains readable over variable video frames.
- Use a desktop two-column content composition and a centered mobile layout.
- Normalize CTA typography through CSS rather than inline font declarations.

## Strategy

- Replace tall scroll-driven step spacing with a compact three-card layout.
- Keep images horizontally aligned and smaller on desktop; stack cards on mobile.
- Add a CSS-only light sweep and subtle image/card hover interaction.
- Respect reduced-motion preferences and remove invalid inline font declarations.

## Case studies and lazy loading

- Remove the decorative logo image and fixed minimum heights that create empty space.
- Let cards size to their content and keep carousel controls compact.
- Preserve lazy rendering with a smaller reserved placeholder and render-on-force behavior.
- Add hover/focus elevation and image/card transition effects without relying on hover for functionality.

## Verification

- Build the frontend after the router removal.
- Run available frontend tests or explicitly verify when the repository has no tests.
- Check that all section anchors resolve and that production compilation succeeds.
