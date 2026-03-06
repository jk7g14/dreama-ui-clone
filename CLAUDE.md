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

## UI Spec 캡처 (agent-browser)

원본 Dreamina의 인터랙션/로딩/애니메이션을 캡처하는 방법:

1. **Chrome 디버그 모드 실행** (세션 시작 시 1회):
   ```bash
   setsid google-chrome-stable --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-jaehun --no-first-run --disable-gpu </dev/null >/tmp/chrome-out.log 2>&1 &
   ```

2. **옵저버 세팅** — Dreamina 페이지에서 `references/extraction-scripts/setup-observers.js` 실행:
   ```bash
   npx agent-browser --auto-connect open "https://dreamina.capcut.com/ai-tool/home?type=image"
   npx agent-browser --auto-connect eval "$(cat references/extraction-scripts/setup-observers.js)"
   ```
   DOM 변화, 네트워크 요청, CSS 트랜지션/애니메이션을 타임스탬프와 함께 `window.__specLog`에 기록

3. **액션 수행 + 스크린샷**:
   ```bash
   npx agent-browser --auto-connect screenshot references/spec/01-step-name.png
   npx agent-browser --auto-connect upload "input[data-test-upload=true]" path/to/image.png
   npx agent-browser --auto-connect click "selector"
   npx agent-browser --auto-connect hover "selector"
   ```

4. **로그 덤프**:
   ```bash
   npx agent-browser --auto-connect eval "JSON.stringify(window.__specLog, null, 2)"
   ```
   - 필터: `window.__specLog.filter(l => l.cls && l.cls.includes('reference'))`

5. 결과물은 `references/spec/`에 저장 (스크린샷 + JSON 로그)

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- AI Elements (`@vercel/ai-elements`) for prompt input components
- shadcn/ui for Select, Button, etc.
