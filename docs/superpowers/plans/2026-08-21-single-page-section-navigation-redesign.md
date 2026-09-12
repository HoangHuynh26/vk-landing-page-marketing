# Single-page Section Navigation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the site to a polished single-page landing experience with section navigation and tighter hero, strategy, and case-study presentation.

**Architecture:** Remove React Router from the application entrypoint and render `Layout` with `Home` directly. Navbar and footer use same-page anchors; Home exposes stable IDs for strategy, case studies, FAQ, and lead form. Strategy becomes a compact responsive card grid, while CaseStudy remains a lazy-loaded carousel with content-sized cards and CSS hover/focus effects.

**Tech Stack:** React 19, Create React App, CSS transitions/keyframes, IntersectionObserver, existing i18n context.

**Spec:** `docs/superpowers/specs/2026-08-21-single-page-section-navigation-redesign.md`

## Global Constraints

- Render the landing page directly from `index.js` without `BrowserRouter`, `Routes`, or `Outlet`.
- Navbar links use same-page anchors for `#strategy`, `#case-studies`, `#faq`, and `#lead-form`.
- Keep video full-bleed at `100svh` using `object-fit: cover`.
- Respect reduced-motion preferences and preserve keyboard focus styles.
- Remove the decorative case-study logo image and fixed minimum heights.

### Task 1: Remove route architecture and wire section navigation

**Files:**
- Modify: `frontend/src/index.js`
- Modify: `frontend/src/components/layout/Layout.jsx`
- Modify: `frontend/src/components/navbar/Navbar.jsx`
- Modify: `frontend/src/components/navbar/Navbar.css`
- Modify: `frontend/src/components/footer/Footer.jsx`
- Modify: `frontend/src/pages/home/Home.jsx`

**Interfaces:**
- `Layout` renders `Navbar`, `Home`, `Footer`, and `Chatbot` directly.
- Navbar anchors target `#strategy`, `#case-studies`, `#faq`, and `#lead-form`.

- [ ] **Step 1: Render the landing page directly**

Replace the router wrapper in `index.js` with `LanguageProvider` containing `Layout`; update `Layout` to import and render `Home` instead of `Outlet`.

- [ ] **Step 2: Replace route links with section anchors**

Use stable anchor mappings in `Navbar.jsx` and `Footer.jsx`. Preserve the existing mobile menu close behavior and CTA link to `#lead-form`.

- [ ] **Step 3: Remove route-only navbar state**

Remove `useLocation` and inner-page class logic. Keep scroll state, language state, menu keyboard handling, and focus styling.

- [ ] **Step 4: Add section IDs on Home**

Wrap or assign IDs so strategy, case studies, FAQ/lead CTA, and lead form anchors resolve without adding duplicate IDs.

- [ ] **Step 5: Run the frontend build**

Run: `npm.cmd run build --prefix frontend`
Expected: The app compiles without React Router imports being required.

### Task 2: Redesign the full-screen hero and CTA typography

**Files:**
- Modify: `frontend/src/components/hero/Hero.jsx`
- Modify: `frontend/src/components/hero/Hero.css`

**Interfaces:**
- Hero continues rendering `GlowButton`, localized copy, and the existing full-screen video asset.

- [ ] **Step 1: Create the new content structure**

Use a hero content grid with a copy panel and a compact visual/support panel while keeping the video and overlay as absolute full-viewport layers.

- [ ] **Step 2: Add readable overlay treatment**

Replace the transparent overlay with a directional gradient that preserves video visibility and establishes sufficient text contrast.

- [ ] **Step 3: Normalize CTA button typography**

Move CTA font sizing/weight/letter-spacing to `.hero-actions .glow-btn`, using the site’s existing Inter/system stack and removing dependence on inline font declarations.

- [ ] **Step 4: Add responsive and reduced-motion rules**

Collapse to one column below the mobile breakpoint and stop decorative hero motion under `prefers-reduced-motion`.

### Task 3: Compact Strategy into interactive image cards

**Files:**
- Modify: `frontend/src/components/strategy/Strategy.jsx`
- Modify: `frontend/src/components/strategy/Strategy.css`

**Interfaces:**
- Strategy consumes the same localized `strategy.steps` array and `stepImages` assets.
- Each step remains readable without hover and exposes image alt text.

- [ ] **Step 1: Replace scroll-height step markup**

Render a three-card list with numbered heading, title, body, and a smaller image per step. Retain the section heading and remove the IntersectionObserver-driven `activeStep` state.

- [ ] **Step 2: Implement horizontal desktop layout**

Use a responsive three-column grid with consistent card heights, compact section padding, and no tall `min-height: 72vh` gaps.

- [ ] **Step 3: Add light-sweep and image interaction effects**

Use a pseudo-element gradient sweep on card hover/focus and transform/scale image interaction. Keep effects transform/opacity-based and disable them for reduced motion.

- [ ] **Step 4: Fix typography declarations**

Remove invalid `SF Pro` inline styling and use the established body/display font stack with explicit readable sizes and line heights.

- [ ] **Step 5: Build and inspect layout output**

Run: `npm.cmd run build --prefix frontend`
Expected: Build succeeds with no JSX/style syntax errors.

### Task 4: Tighten Case Study cards and lazy loading

**Files:**
- Modify: `frontend/src/components/caseStudies/CaseStudy.jsx`
- Modify: `frontend/src/components/caseStudies/CaseStudy.css`
- Modify: `frontend/src/pages/home/Home.jsx`
- Modify: `frontend/src/index.css`

**Interfaces:**
- `CaseStudy` continues accepting `{ studies }` and retains carousel controls, pause behavior, and reduced-motion support.
- `LazyLoad` continues receiving `children`, `className`, and optional `force` props.

- [ ] **Step 1: Remove the decorative small image**

Delete the logo image from `CaseStudyCard` and remove the associated CSS rules.

- [ ] **Step 2: Remove fixed empty-space constraints**

Replace `min-height: 590px` on the stage and card with content-sized layout and compact responsive padding.

- [ ] **Step 3: Add card hover and focus interaction**

Add a subtle transform, shadow, and border/accent response for `.case-study:hover` and `:focus-within`, with reduced-motion overrides.

- [ ] **Step 4: Adjust lazy placeholder sizing**

Give the case-study lazy wrapper a modest reserved block height rather than a broad generic placeholder, preserving layout stability while avoiding a large empty gap.

### Task 5: Verify the single-page redesign

**Files:**
- No new files required.

- [ ] **Step 1: Run available frontend tests**

Run: `$env:CI='true'; npm.cmd test --prefix frontend -- --watchAll=false --passWithNoTests`
Expected: Tests pass, or the command exits successfully when no tests are present.

- [ ] **Step 2: Build the production bundle**

Run: `npm.cmd run build --prefix frontend`
Expected: Production build succeeds.

- [ ] **Step 3: Check section anchor targets**

Run: `rg -n 'id="(strategy|case-studies|faq|lead-form)"|href="#(strategy|case-studies|faq|lead-form)"' frontend/src`
Expected: Every navbar/footer target has a matching rendered ID.

- [ ] **Step 4: Check for removed route usage**

Run: `rg -n 'BrowserRouter|Routes|Route|Outlet|useLocation' frontend/src/index.js frontend/src/components frontend/src/router`
Expected: No active application file requires route-based navigation.
