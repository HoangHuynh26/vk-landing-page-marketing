# VK Digital Hub — Design System & UI/UX Specification

## 1. Design Direction

The current landing page already uses a polished Nail & Spa marketing visual language with:

* Warm cream background
* Pink / purple gradient
* Dark plum sections
* Rounded cards
* Glassmorphism navbar
* Soft shadows
* Gradient CTA buttons
* Animated border glow
* Scroll-based animation
* Minimal premium aesthetic

DO NOT redesign the visual identity from scratch.

The goal is to progressively improve the current design while preserving the existing visual language and content structure.

Reference interface:

https://4rxjdjv2tx3l4.kimi.page/

Use the reference only as visual inspiration.

Do NOT copy the exact layout, assets, or implementation.

---

# 2. Brand Visual System

## Primary Colors

Do NOT use pink or purple as primary brand colors.

Pink and purple may only appear as extremely subtle secondary accents if necessary, but the primary visual identity must be based on:
- Deep Teal
- Champagne Gold
- Terracotta
- Ivory
- Dark Charcoal

The new visual system must NOT be monochrome.

Create a premium, modern, sophisticated multi-color palette suitable for a high-end service/marketing brand.

Recommended direction:

:root {
  --primary: #0F766E;
  --primary-dark: #115E59;
  --secondary: #C9974E;
  --accent: #D97757;
  --background: #F7F3EC;
  --surface: #FFFFFF;
  --dark: #17221F;
  --muted: #66736E;
  --success: #2F855A;
}

Color roles:

Deep Teal → primary brand color
Champagne Gold → premium/high-value accent
Terracotta → warm human accent
Ivory/Cream → main background
White → cards and surfaces
Dark charcoal/green → typography
Soft green → success states

The design must contain visual color contrast without becoming colorful or childish.

Use color intentionally:

CTA → teal + champagne highlight
Hero → dark teal overlay
Important metrics → champagne/terracotta accents
Cards → white/ivory
Success → muted green
Alerts → soft warm red
Hover glow → teal + gold
Borders → low-opacity neutral tones

Avoid:

neon colors
excessive gradients
rainbow palettes
overly saturated UI
single-color monochrome design

The final visual direction should feel:

Premium
Modern
Trustworthy
Elegant
Warm
Professional

Visual inspiration:

Luxury service brand
Modern digital agency
Premium wellness/beauty brand
High-end Australian local business

Do not make the website look like a generic SaaS dashboard.

---

# 3. Typography

Primary font:

```text
Inter
```

Fallback:

```text
SF Pro
-apple-system
sans-serif
```

Font weights:

* Body: 400
* Navigation: 600
* Headline: 800

Minimum sizes:

* Main headline: 32px+
* Body: 16px+
* CTA: 18px+
* Navigation: approximately 14–16px

Recommended visual hierarchy:

H1:
32px–54px responsive

H2:
32px–42px responsive

H3:
20px–28px

Body:
16px–19px

Small text:
13px–15px

Avoid excessively small marketing copy.

---

# 4. Layout System

Current content width:

```css
max-width: 1120px;
```

Preserve this general width.

Use:

```text
max-width: 1120px
margin: 0 auto
```

Desktop section spacing:

80px minimum.

Mobile section spacing:

40px minimum.

Use generous whitespace.

The page should feel spacious rather than dense.

---

# 5. Navbar

Current navbar characteristics:

* Fixed
* Full width
* Semi-transparent cream background
* backdrop blur
* bottom border
* centered content
* logo left
* navigation right
* language toggle
* CTA

Preserve this architecture.

Improve:

### Desktop

Layout:

```text
[ VK Digital Hub ]     Home | Case Studies | FAQ | About | VI/EN | CTA
```

Navbar height should remain compact.

Use subtle glassmorphism:

* translucent background
* backdrop blur
* thin border
* subtle shadow when scrolling

The mobile menu must not simply hide navigation links.

Implement an actual accessible mobile menu:
- menu button
- open/close animation
- overlay or dropdown panel
- close on navigation selection
- Escape key support
- body scroll lock while menu is open

### Mobile

Do NOT simply hide navigation links without providing a usable navigation system.

Instead use:

* compact logo
* language toggle
* CTA
* mobile menu trigger

The menu should open smoothly.

Avoid horizontal wrapping inside the navbar.

---

# 6. Logo

Current logo:

```text
VK
VK Digital Hub
```

Preserve the gradient square mark.

Recommended visual improvements:

* slightly softer radius
* subtle gradient depth
* subtle inner highlight
* gentle hover scale

Do not make the logo excessively large.

---

# 7. Language Toggle

Current language toggle:

```text
VI | EN
```

Vietnamese must remain the default.

Behavior:

* smooth pill transition
* active language clearly visible
* minimal visual footprint
* accessible keyboard behavior
* no page reload

Transition:

```text
250–350ms
```

Use the existing animated pill concept.

---

# 8. Primary CTA

Current CTA is one of the strongest visual elements.

Text:

```text
NHẬN BẢN ĐÁNH GIÁ MARKETING MIỄN PHÍ
```

Preserve the current animated border-beam system.

Visual characteristics:

* pill shape
* gradient background
* white text
* moving light beam
* soft glow
* hover lift
* magnetic cursor response

Improve it with:

* subtle 3D depth
* stronger focus state
* slightly smoother easing
* controlled glow
* no excessive brightness

CTA must remain the strongest visual action on the page.

CTA button:
- inner background: Deep Teal
- text: White
- border beam: Champagne Gold + subtle Terracotta
- hover glow: Teal + Gold

HERO CTA

Adapt the current CTA to the new color palette.

Primary CTA:

NHẬN BẢN ĐÁNH GIÁ MARKETING MIỄN PHÍ

Style:

deep teal base
champagne/gold border beam
subtle terracotta highlight
white typography
premium shadow
hover lift
subtle magnetic movement

Border light beam:

teal → gold → terracotta → transparent

The beam should remain elegant and thin.

---

# 9. Border Glow Animation

Current implementation:

```css
.glow-btn::before
```

with:

```css
conic-gradient()
```

and:

```css
@property --ang
```

Preserve this concept.

The light beam should continuously travel around the border.

Recommended behavior:

```text
3–4 second loop
linear motion
subtle glow
```

Avoid:

* thick neon borders
* excessive brightness
* distracting animations
* constant shadow pulsing

The effect should feel premium rather than gaming-oriented.

---

# 10. Hero Section

Current hero:

* full viewport
* background video
* dark overlay
* centered content
* large headline
* CTA
* supporting text
* caption chip

Preserve the structure.

## Hero visual hierarchy

Priority:

1. Headline
2. Supporting message
3. CTA
4. Supporting microcopy

The headline should be dominant.

Do not allow the video to compete with the headline.

---

# 11. Hero Video

The Hero must use a 10-second muted MP4 video as the primary visual background.

The poster image is only a fallback while the video is loading or unavailable.
Do NOT use the poster image as the primary Hero background when the video is available.

VIDEO ASSET REQUIREMENT

If hero-video.mp4 does not exist:
- do not invent an unrelated video
- create the required asset specification/placeholders
- keep the implementation ready for hero-video.mp4
- use hero-poster.webp as fallback

The expected video must show:
busy but cheerful Nail & Spa owner
active customers
appointment activity
premium salon atmosphere
Vietnamese subtitles from 0 seconds
no audio
approximately 10 seconds

Video specification:

Duration: exactly or approximately 10 seconds
Format: MP4
No audio
Autoplay
Muted
Loop
Playsinline
Lightweight compressed video
Mobile-friendly
Poster image fallback
Captions/subtitles visible from the first frame

Video subtitles must NEVER overlap:
- H1
- primary CTA
- supporting text

On desktop place subtitles near the lower third.
On mobile place subtitles above the bottom safe-area.

HTML behavior:

<video
  autoplay
  muted
  loop
  playsinline
  poster="assets/hero-poster.webp"
>
  <source src="assets/hero-video.mp4" type="video/mp4">
</video>

Do not use audio.

Do not make the video depend on user interaction to start.

HERO VIDEO CONTENT

The video must communicate the business outcome visually.

Scene concept:

A Nail & Spa salon owner is extremely busy but cheerful.

Story progression:

0–2 sec:

Salon opens/busy environment
Owner greeting a customer
Positive energy
Customers arriving

2–5 sec:

Owner actively serving customers
Doing nails / managing appointments
Multiple customers being served
Busy appointment atmosphere

5–8 sec:

More customers arrive
Phone notifications / booking activity
Owner remains happy and confident

8–10 sec:

Fully booked atmosphere
Owner smiling
Positive business energy
End with a visually clean frame

The video should communicate:

"Your salon is busy because the marketing system is working."

Do not show stressful or negative emotions.

The owner should look:

confident
cheerful
professional
energetic

The salon should look:

premium
clean
modern
welcoming
realistic

VIDEO CAPTIONS / SUBTITLES

Captions must be visible from 0 seconds.

Use large, high-contrast captions.

Captions should be short and easy to read.

Suggested sequence:

0–2 sec:

"Bạn tập trung làm nails."

2–5 sec:

"Chúng tôi lo phần marketing."

5–8 sec:

"Lịch hẹn tăng đều mỗi tuần."

8–10 sec:

"Ít việc marketing hơn. Nhiều khách hơn."

Caption design:

white text
semi-transparent dark background
rounded rectangle
subtle blur
bold typography
positioned safely away from the CTA
responsive on mobile

Do not place subtitles directly over important facial details.

HERO RESPONSIVE BEHAVIOR

Desktop:

video fills viewport
centered/left-balanced text composition
cinematic background

Tablet:

maintain text readability
reduce video crop if necessary

Mobile:

use a mobile poster/video crop optimized for portrait screens
preserve subtitle visibility
prevent CTA from being covered
prevent horizontal overflow
keep text readable

If video performance is poor on low-end/mobile devices:
use poster image fallback.

PERFORMANCE

The hero video is critical content.

Requirements:

compressed MP4
target approximately 2–5 MB when possible
H.264 preferred for compatibility
no unnecessary 4K video
use poster image
preload only when appropriate
avoid blocking page render

Do not load multiple hero videos simultaneously.
---

# 12. Hero Overlay

Because the video contains visual movement, strengthen the overlay.

Use a layered overlay:

background:
  linear-gradient(
    120deg,
    rgba(15, 118, 110, 0.88),
    rgba(23, 34, 31, 0.60),
    rgba(15, 118, 110, 0.30)
  );

The overlay must:

keep headline readable
preserve visibility of the salon
create premium cinematic contrast
avoid making the video completely dark

HERO VISUAL HIERARCHY

The user should see:

Main headline
Supporting headline
Primary CTA
Small supporting text
Video as visual storytelling background

The video must support the message, not compete with the text.

---

# 13. Loading Screen

Current loading design:

```text
circular spinner
cream background
loading text
```

Preserve this.

Visual:

* cream background
* pink circular spinner
* subtle rotating animation
* centered

Recommended:

* 48–56px spinner
* 0.8–1s rotation
* fade-out when page is ready

Avoid a long blocking loader.

---

# 14. Trust Bar

Current trust section:

```text
★★★★★
4.9/5
40+ Google reviews

30+ salons

SSL
VISA
Mastercard
```

Preserve the information architecture.

Improve layout:

Desktop:

```text
[ Rating ]   [ 30+ salons ]   [ Security ]
```

Mobile:

Stack or horizontal scroll-free arrangement.

The trust section should visually feel lighter than the hero.

Use:

* white background
* subtle borders
* restrained badge styling

Do not over-design security badges.

---

# 15. Stats Section

Current stats:

```text
30+
50%
100%
```

Use large typography.

Recommended:

```text
44px–52px
font-weight: 800
```

Add:

* subtle gradient text
* responsive spacing
* animated number counting

Animation triggers when the section enters the viewport.

The animation should happen once.

---

# 16. Scroll Reveal Cards

Current cards use:

```css
opacity: 0;
translate: 0 48px;
```

and:

```text
IntersectionObserver
```

Preserve this implementation concept.

Animation:

```text
fade in
+
translate upward
+
stagger
```

Recommended stagger:

```text
100–150ms
```

Use smooth easing.

Do not animate cards continuously.

---

# 17. Pain & Solution Cards

Current design:

* white card
* 20px radius
* large shadow
* emoji
* title
* pain
* online solution
* offline solution

Preserve this structure.

Improve visual hierarchy:

```text
[ category ]

icon

title

Pain
description

Online
solution

Offline
solution
```

Avoid rendering the three paragraphs as visually identical text.

Create clear visual distinction between:

* Pain
* Online
* Offline

Possible visual treatment:

Pain:
soft pink background

Online:
soft purple accent

Offline:
soft green/neutral accent

Keep colors subtle.

---

# 18. Card Hover

Current implementation already supports:

* 3D tilt
* cursor glow
* lift
* shadow

Preserve these behaviors.

Recommended tilt:

```text
maximum 6–8 degrees
```

The interaction should follow the cursor smoothly.

Do not allow:

* aggressive rotations
* shaky movement
* excessive zoom
* mobile tilt

Disable cursor-based 3D effects on touch devices.

---

# 19. Cursor-Following Glow

Current:

```css
radial-gradient(
  ... at var(--mx) var(--my)
)
```

Keep the concept.

Improve:

* subtle opacity
* smooth movement
* soft radius
* no harsh edge

The glow should reveal interaction rather than become the main visual.

---

# 20. Magnetic Interaction

Current CTA uses cursor-based translation.

Preserve this idea.

Recommended movement:

```text
5–10px maximum
```

Interaction should be subtle.

Disable or reduce the effect for:

```text
touch devices
prefers-reduced-motion
```

---

# 21. Strategy Section

Current design:

```text
dark plum background
left = scroll steps
right = sticky image
```

This is a key storytelling section.

Preserve it.

Desktop:

```text
STEP 1        | visual
              |
STEP 2        | visual
              |
STEP 3        | visual
```

The visual panel should remain sticky.

---

# 22. Scroll Storytelling

Current implementation uses:

```javascript
IntersectionObserver
```

to activate each step.

Preserve this concept.

When a step becomes active:

* text opacity increases
* corresponding image becomes visible
* image fades in
* image slightly scales from 1.06 → 1

This is correct for a premium storytelling experience.

Avoid:

* excessive parallax
* fast image transitions
* large zoom
* scroll-jacking

The page must remain controlled by natural scrolling.

---

# 23. Strategy Step Visual Hierarchy

Each step:

```text
Icon
Step label
Headline
Description
```

Icons:

```text
Sign Up
Analyze
Implement
```

Use a coherent icon style.

Do not mix unrelated emoji styles if professional iconography is available.

Emoji can remain as fallback/demo assets.

---

# 24. Case Study

Current:

```text
Before
After
Testimonial
Image
```

Preserve.

Improve visual hierarchy:

```text
CASE STUDY

Tiệm Nails A tại Perth

BEFORE
5 clients/week
$500/month ineffective ads

AFTER
25 clients/week
+200% revenue

TESTIMONIAL
...
```

The "After" result should have stronger visual emphasis.

Use:

* large numbers
* metric cards
* positive accent
* clean comparison

Do not exaggerate beyond provided case data.

---

# 25. Live Notification

Current toast:

* fixed bottom-left
* white card
* gradient icon
* slide-in animation

Design must not depend on hardcoded fake notification timing/content.

Notification UI must consume notification objects/data supplied by the application.

Preserve the visual style.

However:

## IMPORTANT

Current sample notifications such as:

```text
Tiệm Nails tại Joondalup vừa đăng ký gói Pro
```

must NOT be presented as genuine activity in production unless they are backed by real campaign data.

Development:

```text
DEMO
```

Production:

Use ProveSource, Nudgify, or real campaign data.

Notification should:

* remain small
* avoid blocking content
* disappear automatically
* avoid appearing too frequently
* support mobile
* respect privacy

---

# 26. FAQ

Current FAQ uses accordion.

Preserve:

* white cards
* rounded corners
* question button
* chevron
* smooth expansion

Improve:

* stronger hover state
* clearer open state
* better keyboard focus
* semantic buttons
* aria-expanded
* reduced-motion handling

Do not make FAQ animations excessively slow.

---

# 27. CTA Form Section

Current section:

* dark gradient
* centered headline
* supporting text
* form

Preserve this hierarchy.

Recommended visual structure:

```text
Headline
Supporting copy

[ Business Name ]
[ Phone Number ]

[ PRIMARY CTA ]

Success/Error message
```

Form should remain narrow enough for easy scanning.

Recommended max-width:

```text
420–480px
```

---

# 28. Form Inputs

Current:

```css
border-radius: 14px
padding: 16px 18px
```

Preserve.

Improve:

* stronger focus ring
* clear invalid state
* mobile-friendly touch area
* proper label association
* accessible error message

Do not rely on placeholder text as the only field label.

---

# 29. Form States

Must visually support:

### Idle

Normal input.

### Focus

Pink/purple focus ring.

### Validation Error

Soft red border + clear message.

### Submitting

Button loading state.

### Success

Green success message.

### Failure

Clear error message.

Do not only change text without visual feedback.

---

# 30. Footer

Current footer is intentionally minimal.

Preserve minimalist style.

Recommended structure:

```text
VK Digital Hub
Marketing for Nail & Spa businesses in Australia

Navigation

Language

CTA

© 2026
```

Do not make the footer unnecessarily large.

---

# 31. Chatbot

Current chatbot:

* bottom-right
* circular launcher
* gradient
* floating box
* chat history
* input

Preserve this concept.

Improve:

* smoother opening animation
* clear close/minimize
* accessible focus
* mobile width
* safe bottom spacing
* avoid overlap with CTA or notifications

---

# 32. Automatic Chatbot Trigger

After 15 seconds of inactivity:

```text
Chào bạn! Em thấy anh/chị đang xem landing, có thắc mắc gì em hỗ trợ ngay ạ.
```

Behavior:

* trigger once
* reset timer when user interacts
* do not spam
* do not reopen repeatedly after dismissal
* support VI/EN

The chatbot should feel helpful rather than intrusive.

---

# 33. Responsive Design

## Desktop

Use:

```text
3-column cards
2-column storytelling
large hero
large CTA
```

## Tablet

Use:

```text
2-column or 1-column depending on available width
```

## Mobile

Use:

```text
single-column content
stack cards
stack stats
stack case study
sequential storytelling
compact navbar
full-width CTA where appropriate
```

Minimum:

```text
40px section spacing
16px side padding
```

Never allow horizontal overflow.

---

# 34. Mobile Navbar

Current code hides:

```css
.nav-links a {
  display:none;
}
```

This should be replaced with a proper mobile navigation system.

Mobile navbar should show:

```text
VK
VI/EN
Menu
```

The CTA can remain visible if there is enough room, otherwise move it into the menu.

---

# 35. Accessibility

Support:

* semantic HTML
* keyboard navigation
* visible focus
* aria labels
* aria-expanded
* color contrast
* form labels
* alt text
* reduced motion

Respect:

```css
@media(prefers-reduced-motion: reduce)
```

Animations should be disabled or significantly reduced.

---

# 36. Animation Principles

All animations must follow:

```text
Fast response
Smooth easing
Small movement
Purposeful interaction
No distraction
```

Recommended timings:

Micro interaction:
200–300ms

Reveal:
500–800ms

Image transition:
600–900ms

CTA beam:
3–4 seconds

Do not make every component animated simultaneously.

---

# 37. Performance

The existing landing page contains:

* video
* multiple images
* IntersectionObservers
* hover calculations
* chatbot
* live notifications

Therefore optimize carefully.

Required:

* lazy loading below-fold images
* compressed WebP images
* compressed MP4
* poster image for hero video
* avoid unnecessary JS
* avoid layout shift
* avoid excessive shadows/filters
* avoid unnecessary animation libraries

Do not lazy-load critical hero assets.

---

# 38. Image Handling

Below-fold images:

```html
loading="lazy"
```

Use:

```text
width
height
aspect-ratio
```

when possible.

Recommended assets:

```text
hero-poster.webp
step1.webp
step2.webp
step3.webp
case-study.webp
```

Use descriptive alt text.

---

# 39. Current JavaScript Animation Architecture

The existing implementation already uses:

* IntersectionObserver
* requestAnimationFrame
* CSS transitions
* CSS keyframes
* custom CSS properties

Preserve these approaches.

Do NOT automatically introduce GSAP, Framer Motion, or another animation library unless there is a clear requirement.

Prefer lightweight native browser APIs.

---

# 40. Design Refactoring Rules

When converting this design into React:

Do NOT blindly copy the entire HTML into one component.

Break the design into reusable components such as:

```text
Navbar
LanguageToggle
CTAButton
Hero
TrustBar
Stats
AnimatedCounter
PainSolution
PainSolutionCard
Strategy
StoryStep
StoryVisual
CaseStudy
LiveNotification
FAQ
LeadForm
Chatbot
Footer
LoadingSpinner
```

However:

Do not create components simply because a section exists.

Create a component when it has:

* reusable behavior
* reusable data
* independent styling
* independent state
* clear responsibility

---

# 41. Data-Driven UI

Move repeated content into data structures.

Examples:

```javascript
strategySteps[]
painSolutions[]
faqItems[]
caseStudies[]
notifications[]
translations{}
```

Do not duplicate Vietnamese and English JSX structures.

---

# 42. Visual Quality Target

The final UI should feel like:

```text
Premium SaaS
+
Modern Digital Agency
+
Luxury Nail & Spa
```

Avoid:

```text
generic template
cheap marketing website
overly neon
excessive gradients
too many floating animations
gaming-style UI
```

The strongest qualities should be:

```text
Trust
Clarity
Premium feel
Conversion
Smooth interaction
```

---

# 43. Existing Implementation That Should Be Preserved

The current implementation already has several good patterns:

* CSS variables
* Inter typography
* fixed glass navbar
* animated CTA border
* hero video
* IntersectionObserver counters
* staggered card reveal
* cursor-following glow
* 3D card tilt
* sticky storytelling
* image crossfade
* FAQ accordion
* form success/failure states
* chatbot inactivity trigger
* VI/EN translation object
* reduced-motion media query

Do not rewrite these unnecessarily.

Improve them incrementally.

---

# 44. Final Design Rule

The goal is NOT:

"Create a completely new landing page."

The goal is:

"Transform the existing VK Digital Hub landing page into a production-quality React experience while preserving its current visual identity, content, animations, and conversion structure."

Every design decision must answer:

1. Does this improve conversion?
2. Does this improve clarity?
3. Does this improve perceived quality?
4. Does this preserve performance?
5. Does this work on mobile?
6. Does this remain maintainable in React?
7. Does this respect the existing architecture?

If the answer is no, do not introduce the change.

IMPLEMENTATION CONSTRAINT

This Design.md describes an enhancement of an existing implementation.

Before modifying any UI:
1. Inspect the current component.
2. Preserve its structure where practical.
3. Change only what is required by this Design.md.
4. Do not rewrite working animation logic unnecessarily.
5. Do not replace native IntersectionObserver/requestAnimationFrame with another library unless necessary.
6. Do not introduce a new design system if an existing one can be extended.
7. Do not remove existing functionality unless explicitly requested.