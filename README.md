# SortSahi AI — Identify It. Sort It Right.

A Next.js web app for text- and image-based waste identification, item-specific explanations, disposal steps, and daily learning challenges.

## Live AI behaviour

When `GEMINI_API_KEY` is configured, **every text and image classification request calls Gemini**. A knowledge-base match does not short-circuit the request. Gemini is asked to identify the specific item and generate a fresh explanation, preparation tips, and disposal guidance for that query/image. Structured JSON output is validated before the UI renders it.

When the key is absent, the app runs in clearly labelled **Demo Mode**; image classification is not simulated as if it were live AI. Demo mode may use reviewed knowledge-base entries for text examples.

AI can still make mistakes. The app should leave the category unconfirmed when the model's confidence is low or unknown. Local municipal disposal rules differ; special-care waste guidance should be checked locally.

## Requirements

- Node.js 20 LTS recommended
- A Google AI Studio API key with access to the configured Gemini model

## Run locally

1. Extract the ZIP and open the `sortsahi-app` directory.
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Copy `.env.example` to `.env.local` and put your real key in the new file:
   ```env
   GEMINI_API_KEY=your_real_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```
   `.env.example` is only a template. Next.js reads `.env.local`. Never prefix the secret with `NEXT_PUBLIC_` and never commit it.
4. Restart the server after changing environment variables:
   ```bash
   npm run dev
   ```
5. Open the local URL shown in the terminal. Test text search (`pen`, `spectacles`, `used battery`) and photo classification (shoes, towel, a battery with its label visible).

## Troubleshooting live AI

- A `401`/`403` usually indicates an invalid key, API access, or project configuration issue.
- A `404` can mean the configured model name is unavailable to the account. Check available models and update `GEMINI_MODEL`.
- A `429` indicates quota/rate limiting; wait for quota reset or use a permitted plan.
- Keep the browser network tab and terminal logs available when diagnosing errors. The key is used only in the server-side route.

## Production build

```bash
npm ci
npm run build
npm start
```

Configure `GEMINI_API_KEY` and `GEMINI_MODEL` in the deployment provider's server-side environment settings too. The local `.env.local` file is not automatically uploaded to hosting. The project must pass `npm run build` and real API smoke tests in the target environment before it should be described as production-verified.
