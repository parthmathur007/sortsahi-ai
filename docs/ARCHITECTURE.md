# SortSahi AI — Architecture

## Overview

A monolithic Next.js 14 (App Router) application deployed on AWS Amplify.
Single repository, single deployment unit. No separate backend service.

```
Browser
  │
  ├── Static pages (CDN)         /  /classify  /challenge  /history
  │       React + Tailwind CSS
  │       localStorage (GreenScore, challenge history)
  │
  └── API routes (Lambda)        POST /api/classify
          Reads GEMINI_API_KEY from env
          Calls Gemini Vision API
          Returns classification from knowledge base
```

---

## Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | SSR API routes protect AI key; Amplify support |
| Language | TypeScript | Type safety for classification logic |
| Styling | Tailwind CSS | Rapid responsive UI development |
| Icons | lucide-react | Consistent, lightweight icon set |
| AI | Google Gemini Flash (configurable with GEMINI_MODEL) | Free tier; vision-capable; fast |
| Storage | localStorage | Zero-cost; appropriate for demo |
| Hosting | AWS Amplify | Supports Next.js SSR; hackathon eligible |

---

## Directory Structure

```
sortsahi-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (Header, BottomNav)
│   │   ├── page.tsx              # Home page (server component)
│   │   ├── loading.tsx           # Global loading fallback
│   │   ├── not-found.tsx         # Custom 404
│   │   ├── classify/page.tsx     # Classify page
│   │   ├── challenge/page.tsx    # Daily challenge page
│   │   ├── history/page.tsx      # Progress page
│   │   └── api/classify/route.ts # Server-side AI route
│   │
│   ├── components/               # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Sticky desktop header
│   │   │   └── BottomNav.tsx     # Mobile bottom navigation
│   │   └── ui/
│   │       ├── WasteStreamBadge.tsx
│   │       ├── GreenScoreCard.tsx
│   │       ├── HomeScoreWidget.tsx
│   │       └── Skeleton.tsx
│   │
│   ├── features/                 # Feature modules (UI + local state)
│   │   ├── classification/
│   │   │   ├── ClassifyFeature.tsx          # Text + image upload UI
│   │   │   └── ClassificationResultCard.tsx # Result display
│   │   ├── learning/
│   │   │   └── DailyChallengeFeature.tsx    # Challenge UI + scoring
│   │   └── rewards/
│   │       └── ProgressFeature.tsx          # Score + level view
│   │
│   ├── lib/                      # Pure logic (no React)
│   │   ├── classification.ts     # Search engine + stream metadata
│   │   ├── scoring.ts            # Points engine + level calculator
│   │   ├── utils.ts              # cn() class merger
│   │   ├── ai/
│   │   │   └── provider.ts       # Gemini + Demo provider
│   │   └── data/
│   │       ├── wasteKnowledge.ts # 28-item reviewed knowledge base
│   │       └── questions.ts      # 30 daily challenge questions
│   │
│   └── types/
│       └── index.ts              # All TypeScript types
│
├── docs/                         # Documentation
├── amplify.yml                   # AWS Amplify build config
├── .env.example                  # Environment variable template
├── tailwind.config.ts            # Custom green theme
└── package.json
```

---

## Classification Architecture

Two-layer design prevents AI hallucination of disposal rules:

```
User input (text or image)
        │
        ▼
┌─────────────────────┐
│   Layer 1: AI       │   Identifies WHAT the item is
│   Gemini Vision     │   Returns: item name + confidence
│   (or DemoProvider) │   Does NOT generate disposal rules
└─────────────────────┘
        │
        ▼ item name
┌─────────────────────┐
│   Layer 2: KB       │   Looks up disposal guidance
│   wasteKnowledge.ts │   Returns: stream + verified steps
│   (deterministic)   │   Based on the curated knowledge base; review against current official and local guidance
└─────────────────────┘
        │
        ▼
   ClassificationResult (shown to user)
```

---

## Data Flow: Classification API Route

```
POST /api/classify
  Body: { query?: string } OR { imageBase64: string, mimeType: string }
  
  if text query:
    → classifyFromText(query)          [local KB lookup, no AI call]
    → return ClassificationResult
    
  if image:
    → createProvider()                 [reads GEMINI_API_KEY from env]
    → provider.identifyFromImage()     [Gemini API call OR demo response]
    → classifyFromAIIdentification()   [KB lookup using identified item]
    → return ClassificationResult
```

---

## Scoring Architecture

```
localStorage["sortsahi_score"] = {
  totalPoints: number,
  level: GreenLevel,
  events: PointEvent[],        // last 50 events
  claimedToday: {              // duplicate prevention
    "2026-10-10": ["daily_challenge"],
    "2026-10-11": ["daily_challenge", "quiz_pass"]
  }
}
```

Points are added via `addPoints()` in `scoring.ts`, which:
1. Checks `claimedToday[today]` for the achievement ID
2. If already claimed: returns `alreadyClaimed: true`, no points added
3. If not claimed: adds points, records event, updates `claimedToday`
4. Recalculates level via `calculateLevel(totalPoints)`

---

## Security

| Concern | Mitigation |
|---------|-----------|
| AI API key exposure | Key only in server-side route.ts; never in client bundle |
| Credential commit | .gitignore excludes .env.local; .env.example has empty values |
| Image upload abuse | 5MB limit, MIME type validation, no disk storage |
| Score manipulation | localStorage only — no server-side score authority needed for demo |
| AI hallucination | AI identifies the likely item; the knowledge base supplies guidance. Unknown or low-confidence results ask for more detail. |
| Local-rule variation | Guidance includes caveats; current municipal rules should be checked before real-world use |

---

## AWS Architecture

```
GitHub repo
    │  git push → webhook
    ▼
AWS Amplify Console
    ├── Build: npm ci && npm run build
    ├── Deploy: static files → Amplify CDN
    └── SSR: /api/* → AWS Lambda (via Next.js adapter)
         └── reads GEMINI_API_KEY from Amplify env vars
```
