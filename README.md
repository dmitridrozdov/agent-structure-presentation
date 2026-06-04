# Agent Architecture Presentation

A Next.js + TypeScript slide deck with animated visualizations.

## Setup

```bash
npx create-next-app@latest my-presentation --typescript --tailwind --app
cd my-presentation
```

Then copy the files from this package into your project:

```
app/
  page.tsx          → app/page.tsx
  layout.tsx        → update app/layout.tsx (add JetBrains Mono + Syne fonts)

data/
  slides.ts         → data/slides.ts

components/
  IntroVisual.tsx
  SplitBrainVisual.tsx
  TruthSourceVisual.tsx
  ChainVisual.tsx
  QualityVisual.tsx
  OriginalsVisual.tsx
  MemoryVisual.tsx
  MapVisual.tsx
  HumanOutroVisuals.tsx
```

## Keyboard Controls

| Key | Action |
|-----|--------|
| → / Space | Next slide |
| ← | Previous slide |
| N | Toggle speaker notes |
| Esc | Close speaker notes |

## Adding Google Fonts to layout.tsx

```tsx
import { JetBrains_Mono, Syne } from 'next/font/google'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const syne = Syne({ subsets: ['latin'], variable: '--font-display' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

## Customization

- Edit `data/slides.ts` to change content, speaker notes, and accent colors
- Each slide has its own visual component in `components/`
- Add new visual types by extending the `Visual` switch in `app/page.tsx`
