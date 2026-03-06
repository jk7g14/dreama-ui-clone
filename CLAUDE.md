# Dreamina AI UI Clone

Pixel-perfect clone of [Dreamina (CapCut AI Tool)](https://dreamina.capcut.com/ai-tool/home?type=image).

## Conventions

- **Extraction artifacts** (CSS/JS analysis scripts, screenshots) go in `references/`, NOT `/tmp`
  - `references/extraction-scripts/` — JS scripts for getComputedStyle, hover rules, etc.
  - `references/*.png` — original Dreamina screenshots and clone version comparisons
- Use `agent-browser` to inspect the original site and extract CSS values
- Design tokens are defined in the `DT` object in `src/components/prompt-bar.tsx`
- Max reference images: 10 (Gemini 3.1 Flash limit)

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- AI Elements (`@vercel/ai-elements`) for prompt input components
- shadcn/ui for Select, Button, etc.
