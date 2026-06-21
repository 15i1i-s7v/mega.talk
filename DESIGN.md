# DESIGN.md: MEGATHON

## Source
- URL: https://megathon.xyz/
- Capture date: 2026-06-21
- Evidence: `webfetch` HTML + markdown from homepage

## Reference Screenshot
- Full-page screenshot unavailable in this environment.
- Visual source of truth inferred from live homepage HTML structure, copy hierarchy, loaded assets, and observed token usage.

## Design Summary
MEGATHON uses a dark launch-event aesthetic: near-black cinematic surfaces, white uppercase typography, and metallic gold accents for hierarchy, CTAs, borders, and data highlights. Layout rhythm is generous, cards are dark and image-led, and navigation/section labels use compact uppercase tracking. The mood is premium, high-pressure, and stage-like rather than enterprise-neutral.

## Design Tokens

### Colors
- `bg/base`: `#0A0A0A` observed
- `bg/elevated`: `#111111` inferred
- `bg/elevated-2`: `#171717` inferred
- `text/primary`: `#F7F3EA` inferred from white-on-dark treatment
- `text/muted`: `#B9B19F` inferred warm muted copy
- `accent/gold`: `#D4A72C` observed/inferred from repeated `mega-gold`
- `accent/gold-bright`: `#F4D271` observed in radial CTA gradient
- `accent/gold-deep`: `#8A6516` observed in radial CTA gradient
- `border/subtle`: `rgba(212,167,44,0.18)` inferred
- `border/strong`: `rgba(212,167,44,0.38)` inferred
- `success`: muted green, only for live-state indicators
- `error`: warm red, keep restrained

### Typography
- Display / hero: heavy condensed techno/sports feel; practical match = `Russo One`
- Body / UI: clean geometric sans with strong uppercase support; practical match = `Raleway`
- Decorative labels / premium chips: sharper editorial accent; practical match = `Syne`
- Headings are often uppercase with slight positive tracking
- Small labels use high tracking and medium/bold weight

### Spacing And Layout
- Max content width: ~`max-w-6xl` / `max-w-7xl`
- Section rhythm: large vertical spacing, especially hero and section transitions
- Cards: `rounded-xl` to `rounded-2xl`
- Borders: subtle gold rings rather than gray separators
- Backgrounds: layered gradients, radial glows, glass blur on sticky bars

## Components
- CTAs: dark or white-filled buttons with strong contrast; gold used for premium actions and badges
- Cards: dark image/surface cards with bottom gradient overlays and gold rings
- Pills/badges: rounded-full, tracked uppercase, muted dark fill with gold border/accent
- Headers: sticky, translucent dark background with blur
- Stats: white numeric emphasis, muted label, gold iconography

## Page Patterns
- Full-bleed hero with cinematic media and overlay
- Kicker label → uppercase display heading → short supporting copy → CTA row
- Grid-based sections with mixed card sizes
- Repeated “live / event / finals / track” status chips

## Content Style
- Short, declarative, stage-ready copy
- Headlines are bold, urgent, and mission-driven
- CTA language is direct: Apply, Build, Compete, Launch

## Agent Build Instructions
- Use a near-black background everywhere; avoid beige or soft SaaS neutrals
- Use gold as the main highlight for active states, CTA outlines, icons, and premium rings
- Keep cards dark, dense, and slightly glossy with subtle blur/shadow
- Uppercase section headings and compact tracked labels should drive hierarchy
- Preserve product UX readability: form fields and analysis rows still need strong contrast and calm spacing
- Translate the event aesthetic into dashboard language, not event-marketing copy

## Rerun Inputs
workflow: firecrawl-website-design-clone
source_url: https://megathon.xyz/
target_stack: Next.js + Tailwind CSS
output: DESIGN.md
