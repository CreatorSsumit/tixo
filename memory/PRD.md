# Tixo Global — Landing Page PRD

## Original Problem Statement
Redesign an existing HTML landing page for an AI-powered international student recruitment agency named "Tixo Global" into a premium, modern React SPA with a 2026 AI startup aesthetic (similar to Stripe, OpenAI, or Vercel).

## Core Requirements

### Design System
- **Colors:** Primary Red `#E50914`, Deep Red `#C2000F`, Dark Black `#0A0A0A`, Soft Gray `#F7F7F7`, Text Dark `#1A1A1A`, Accent Gradient `linear-gradient(135deg, #E50914, #FF3B3B)`
- **Typography:** "Bebas Neue" / "Inter Tight" for headings, "Inter" / "Manrope" for body
- **Aesthetic:** Futuristic, AI-driven, minimal, premium, SaaS-grade

### Key Sections
1. **Navbar** — Logo, navigation links, "Book a Call" CTA
2. **Hero** — Two-column layout: headline + stats + CTAs | 3D animated globe + floating cards
3. **Ticker** — Animated marquee with brand messages
4. **Services** — Six Integrated Capabilities cards (icon on left, badge on top-left)
5. **WhyTixo** — Pillars + metric cards panel with permanent red top border
6. **Approach / Process** — How we build section
7. **CaseStudies** — Student Recruitment Results (dark cards with visible country tags)
8. **FAQ** — Accordion with visible question text
9. **CTA Section** — Full-width red background call-to-action
10. **Footer** — Logo, links, socials, copyright

---

## Tech Stack
- **Frontend:** React (CRA)
- **Styling:** Tailwind CSS + custom CSS in `index.css`
- **3D Graphics:** Three.js via `@react-three/fiber` + `@react-three/drei`
- **Architecture:** Component-based SPA (no backend, no database)

---

## File Architecture
```
/app/frontend/src/
├── App.js              — Main page assembly
├── index.css           — Global styles, CSS variables, Tailwind overrides
└── components/
    ├── Navbar.jsx       — Sticky header with logo + nav
    ├── Hero.jsx         — Hero layout + animated stats cards
    ├── GlobeCanvas.jsx  — Three.js 3D globe
    ├── Ticker.jsx       — Animated marquee
    ├── Services.jsx     — Six capability cards
    ├── WhyTixo.jsx      — Why Tixo pillars + metric cards
    ├── Approach.jsx     — Process/how we build section
    ├── CaseStudies.jsx  — Four case study dark cards
    ├── FAQ.jsx          — Accordion FAQ section
    ├── CTASection.jsx   — Full-width CTA banner
    ├── Contact.jsx      — Contact form
    └── Footer.jsx       — Footer with logo, links, socials
```

---

## What's Been Implemented

### Phase 1 — Full React Migration (Initial Build)
- Migrated from static HTML to component-based React app
- Implemented all page sections with specified color system and typography
- Created Three.js 3D globe in `GlobeCanvas.jsx` with glowing nodes, connection lines, floating labels
- Implemented animated counters, micro-animations (fade-in on scroll, 3D tilt), marquee ticker
- Integrated new company logo in header and footer

### Phase 2 — Iterative UI Refinements (Multiple rounds)
- Adjusted hero spacing, stats grid, CTA layout
- Redesigned service cards, case study cards (dark premium theme)
- Fixed globe label positioning and initial rotation
- Implemented `overflow: visible` on globe label container
- Redesigned metric cards with gradient backgrounds and hover states

### Phase 3 — UI Polish Batch (Latest - Feb 2026)
- **Services:** Icons moved to left of title text; badge stays top-left; "Learn more →" links removed
- **Hero stats:** Redesigned as individual cards with `border-top: 3px solid #E50914` (now visually distinct)
- **Hero:** Reduced spacing from "AI-Powered..." tagline to headline (`marginBottom: 28 → 10`)
- **FAQ:** Question text color improved from `#999` → `#e0e0e0` for dark background visibility
- **CaseStudies:** Country tags (India, Pakistan, UAE, etc.) now have red-tinted border + lighter text
- **WhyTixo metric cards:** `borderTop` changed from `transparent` → `rgba(229,9,20,0.35)` (permanent visibility)
- **Navbar logo:** Increased from 38px → 72px height
- **Footer logo:** Increased from 36px → 72px height

---

## Prioritized Backlog

### P1 — Upcoming
- **Globe Hover Interaction:** Hovering over a globe node should expand popup, highlight connection lines, intensify node glow

### P2 — Future
- **Performance Optimization:** Bundle size audit, 60fps animation review, lazy loading
- **Contact Form:** Make contact form functional (currently static)
- **Responsive polish:** Full mobile/tablet QA pass

---

## Assets
- `/app/frontend/public/tixo-logo.jpg` — Company logo (used in header + footer)
