# AWS Deployment Guide — SortSahi AI

## Deployment Status
**Not yet deployed** — this document describes how to deploy.
The application is ready for deployment; actual deployment requires AWS account access.

---

## Recommended Service: AWS Amplify Hosting

AWS Amplify Hosting supports Next.js 14 (App Router) with SSR, which is required
for the `/api/classify` server-side route that protects the AI API key.

Reference: https://docs.aws.amazon.com/amplify/latest/userguide/getting-started-next.html

---

## Prerequisites

- AWS account
- GitHub account (repository connected to Amplify)
- (Optional) Google Gemini API key for AI classification

---

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
cd sortsahi-app
git init
git add .
git commit -m "Initial commit: SortSahi AI"
git remote add origin https://github.com/YOUR_USERNAME/sortsahi-ai.git
git push -u origin main
```

### 2. Connect to AWS Amplify

1. Sign in to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app" → "Host web app"**
3. Select **GitHub** as the repository source
4. Authorise Amplify to access your GitHub account
5. Select the `sortsahi-ai` repository and `main` branch
6. Amplify will auto-detect Next.js and import `amplify.yml`

### 3. Configure Build Settings

Amplify uses `amplify.yml` in the project root (already created):

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 4. Add Environment Variables

In Amplify Console → Your App → **Environment variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `GEMINI_API_KEY` | `your-key-here` | Optional; app works without it in demo mode |

> **Security:** Never put real API keys in `amplify.yml` or source code.
> Amplify injects them as server-side environment variables at build/runtime.

### 5. Deploy

Click **"Save and deploy"**. Amplify will:
- Install dependencies (`npm ci`)
- Build the app (`npm run build`)
- Deploy to a managed CDN with a `*.amplifyapp.com` URL

### 6. Verify

After deployment (typically 3–5 minutes):
- Open the provided URL
- Test text classification (works in demo mode)
- If `GEMINI_API_KEY` is set, test image classification

---

## Architecture Notes

- **Frontend**: Static pages served from Amplify CDN
- **API routes** (`/api/classify`): Run as Lambda functions via Amplify SSR
- **AI key**: Stored in Amplify Environment Variables — never in the browser bundle
- **User data**: localStorage only — no database required

---

## Cost Estimate

AWS Amplify Free Tier (as of 2026):
- 1,000 build minutes/month free
- 5 GB storage free
- 15 GB data transfer/month free

For a hackathon demo, cost is effectively **$0**.

---

## Production Considerations (Post-Hackathon)

If scaling beyond a demo:
- Add Cognito for user accounts (replace localStorage with server-side sessions)
- Add DynamoDB for persistent GreenScore storage
- Add WAF rate limiting on the API route
- Add CloudWatch monitoring

These are not required for the hackathon submission.

---

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Amplify app created and connected to repo
- [ ] `amplify.yml` in repository root
- [ ] Environment variables added in Amplify Console
- [ ] Build succeeds in Amplify
- [ ] Live URL tested
- [ ] No API keys in source code or build logs
