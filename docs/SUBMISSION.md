# SortSahi AI — Hackathon Submission

**Event:** WeMakeDevs Environmental Hacks 2026  
**Track:** Track 03 — Waste and Energy  
**Team name:** ASAP  
**Project name:** SortSahi AI  
**Tagline:** Identify it. Sort it right.

---

## Submission Links

> Replace the placeholders below with real URLs before submitting.

| Resource | Link |
|----------|------|
| Live application | `[DEPLOYED_URL — replace before submission]` |
| GitHub repository | `[GITHUB_URL — replace before submission]` |
| Demo video (≤3 min) | `[VIDEO_URL — replace before submission]` |

---

## Project Summary (100 words)

SortSahi AI is an AI-assisted waste segregation guide for Indian households.
Users type an item name or upload a photo; the app instantly identifies the item
and suggests a likely waste stream, explains the reasoning, and provides practical
next-step guidance from a curated starter knowledge base. Ambiguous or unknown
items are not forced into a category; users are asked for more detail.
A daily challenge question bank and GreenScore system reward learning and motivate
continued engagement. Built with Next.js and deployed on AWS Amplify, the
application works without registration and functions in demo mode without any
API key — ensuring access for all users regardless of backend availability.

---

## Problem Statement

India generates 62 million tonnes of municipal solid waste per year. Incorrect
segregation contaminates recyclable streams, disrupts composting, and sends
hazardous material to landfill. The barrier is not willingness — it is knowledge.
Most households have separate bins but don't know which item goes where.

SortSahi AI removes this barrier at the exact moment of decision.

---

## AWS Integration

- **Service used:** AWS Amplify Hosting
- **How it is used:** The Next.js application is deployed on AWS Amplify. Static pages are served from Amplify's CDN. The `/api/classify` route runs server-side as an AWS Lambda function (via Next.js SSR), keeping the AI API key secure and never exposed to the browser.
- **Build config:** `amplify.yml` in the repository root
- **Environment variables:** Stored in Amplify Console (not in code)

> **Deployment status:** Application is ready for deployment. See `docs/AWS_DEPLOYMENT.md` for complete step-by-step instructions. Actual deployment requires AWS account access.

---

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini Flash (optional; configured through GEMINI_MODEL) |
| Storage | localStorage (demo mode) |
| Hosting | AWS Amplify |

---

## Feature Checklist

| Feature | Status |
|---------|--------|
| Text-based waste classification | Starter knowledge-base lookup; needs broader evaluation |
| Image upload + AI identification | Requires a valid API key and a model available to the account |
| Four waste streams (Wet/Dry/Sanitary/Special) | ✅ |
| Curated starter knowledge base | Included; must be reviewed against current official/local guidance |
| Conditional follow-up questions | ✅ |
| GreenScore points system | ✅ |
| GreenLevels (5 tiers) | ✅ |
| Daily Challenge (30 questions) | ✅ |
| Duplicate reward prevention | ✅ |
| Learning history | ✅ |
| Mobile-responsive UI | ✅ |
| AWS Amplify deployment config | ✅ |
| Demo mode (no API key required) | ✅ |
| Zero secrets in client bundle | ✅ |

---

## Honest Limitations

- **Deployment:** Do not report the app as deployed until the public URL is live and tested. AWS deployment requires the team's AWS account and environment configuration; the build has not been verified in this editing environment.
- **Persistence:** User scores are stored in browser localStorage only — not synced across devices.
- **AI accuracy:** Image classification accuracy depends on image quality and the Gemini model's capabilities.
- **Knowledge base size:** 28 items covers the most common household waste. Edge cases may return "not found."
- **Local variation:** Waste rules and collection routes vary by municipality. Review the knowledge base against current official and local guidance before presenting it as authoritative.

---

## Environmental Value

SortSahi AI targets the knowledge gap, not the infrastructure gap.

Better segregation knowledge → more correct sorting → less contamination of recyclable streams → more effective recycling and composting → less waste to landfill.

The application does not claim specific environmental metrics (tonnes recycled, CO₂ avoided) — these would be unverifiable for a demo application and are beyond the scope of what the tool directly controls.

---

*SortSahi AI — Built for WeMakeDevs Environmental Hacks 2026 by ASAP*
