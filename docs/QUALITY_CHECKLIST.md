# SortSahi AI — Release Quality Checklist

Use this checklist before sharing the live URL with judges. A feature is not complete just because its component exists.

## Build and runtime
- [ ] `npm ci` completes successfully on a clean checkout.
- [ ] `npm run build` completes without errors.
- [ ] `npm run dev` starts and all routes load.
- [ ] No secrets are committed; `.env.local` is ignored.
- [ ] The public deployment URL is reachable over HTTPS.

## Classification
- [ ] `banana peel` returns wet waste from a reviewed rule.
- [ ] `used battery` returns special-care guidance.
- [ ] `packet` does not receive a confident category without enough material detail.
- [ ] Unknown text says no reviewed rule matched and asks for more detail.
- [ ] JPEG, PNG, and WebP uploads under 5 MB are accepted.
- [ ] Unsupported formats and oversized images show helpful errors.
- [ ] No-key demo mode clearly explains image analysis is unavailable.
- [ ] Invalid key, quota errors, and model timeouts do not produce fabricated classifications.
- [ ] Low/unknown confidence images do not receive a forced category.
- [ ] Disposal guidance contains local-rule caveats where appropriate.

## Learning and rewards
- [ ] Daily challenge loads a question and answer options.
- [ ] Correct answer awards points once per local calendar day.
- [ ] Incorrect answer awards no correct-answer points.
- [ ] Repeated submissions cannot duplicate a daily reward.
- [ ] Score and level refresh across Home, Challenge, and Progress views.
- [ ] Browser storage limitations are disclosed honestly.

## UI and accessibility
- [ ] Text remains readable at mobile widths (320–390 px).
- [ ] Buttons and input fields have visible focus states.
- [ ] Upload can be triggered with keyboard navigation.
- [ ] Loading, error, empty, ambiguous, and successful states are all understandable.
- [ ] No dead buttons or broken links remain.
- [ ] No horizontal overflow on phone or desktop.

## Submission integrity
- [ ] Repository contains real source, setup instructions, and `.env.example` only.
- [ ] AWS services listed in the write-up are actually used.
- [ ] Model name and AI API status are accurate.
- [ ] Screenshots/video show the actual deployed build.
- [ ] Environmental impact claims are framed as intended outcomes unless measured.
