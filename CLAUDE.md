# Dreamina AI UI Clone

Pixel-perfect clone of [Dreamina (CapCut AI Tool)](https://dreamina.capcut.com/ai-tool/home?type=image).

## Conventions

- **Extraction artifacts** (CSS/JS analysis scripts, screenshots) go in `references/`, NOT `/tmp`
  - `references/extraction-scripts/` — JS scripts for getComputedStyle, hover rules, etc.
  - `references/*.png` — original Dreamina screenshots and clone version comparisons
- Use `agent-browser` to inspect the original site and extract CSS values
- **agent-browser auto-connect**: Chrome을 `--remote-debugging-port=9222`로 실행한 후 `--auto-connect` 사용
  - 실행: `setsid google-chrome-stable --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-jaehun --no-first-run --disable-gpu </dev/null >/tmp/chrome-out.log 2>&1 &`
  - 연결: `npx agent-browser --auto-connect <command>` 또는 `export AGENT_BROWSER_AUTO_CONNECT=1`
- Design tokens are defined in the `DT` object in `src/components/prompt-bar.tsx`
- Max reference images: 10 (Gemini 3.1 Flash limit)

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- AI Elements (`@vercel/ai-elements`) for prompt input components
- shadcn/ui for Select, Button, etc.
