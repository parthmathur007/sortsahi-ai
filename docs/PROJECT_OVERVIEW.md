# SortSahi AI — Project Overview

**Event:** WeMakeDevs Environmental Hacks 2026  
**Track:** Track 03 — Waste and Energy  
**Team:** ASAP  
**Tagline:** Identify it. Sort it right.

---

## The Problem

India generates approximately 62 million tonnes of municipal solid waste annually.
A significant proportion is either not segregated at all, or is incorrectly sorted —
sending recyclable material to landfill, contaminating compost with hazardous items,
and blocking drains with non-flushable waste.

The root cause is simple: most people want to sort correctly but do not know how.
The rules are complex, vary by item condition and local facility, and are rarely
communicated in an accessible way.

SortSahi AI addresses this at the exact moment it matters — when someone is
standing at their bins and not sure which one to use.

---

## The Solution

A lightweight, mobile-first web application that:

1. **Identifies** any household waste item (via typed name or uploaded photo)
2. **Classifies** it into one of India's four standard waste streams
3. **Explains** why, with verified disposal instructions
4. **Teaches** through a daily challenge question bank
5. **Motivates** through a simple GreenScore and level system

No registration. No app download. Works on any phone with a browser.

---

## Target Users

- **Indian households** in cities with segregated collection
- **Students** in hostels and PGs
- **Residential communities** and apartment complexes
- **Schools** and educational institutions

---

## Four Waste Streams

| Stream | Colour | Examples |
|--------|--------|---------|
| Wet Waste | 🟢 Green | Kitchen scraps, food peels, garden waste |
| Dry Waste | 🔵 Blue | Paper, plastic, glass, metal (clean) |
| Sanitary Waste | 🟣 Red/Black | Sanitary pads, diapers, used tissues |
| Special-Care | 🔴 Orange/Red | Batteries, e-waste, medicines, chemicals |

---

## Key Features

### Waste Classification
- Text search with fuzzy matching across 28 reviewed waste items
- Photo upload with AI vision analysis (Google Gemini 1.5 Flash)
- Conditional follow-up questions for ambiguous items (e.g. greasy pizza box)
- Full disposal instructions based on SWM Rules 2016
- Clear demo-mode labelling when no AI key is configured

### GreenScore & GreenLevels
- Points awarded for learning activities (not for scanning items)
- Five levels from Green Beginner (0 pts) to Planet Protector (1,000 pts)
- Duplicate-reward prevention (daily-limited achievements)
- Progress bar and encouraging messages

### Daily Challenge
- 30 curated questions covering common and confusing waste items
- Deterministic daily selection (same question for everyone on the same day)
- Immediate feedback with explanations and educational tips
- Points awarded for correct answers; prevention of same-day re-claim

### Learning History
- Full activity log with dates and points
- Level roadmap showing all five levels
- Points-to-next-level calculation

---

## Environmental Impact Claim

SortSahi AI improves waste-sorting knowledge. It does not claim to measure
actual environmental impact (tonnes recycled, CO₂ avoided, etc.) — such
claims would be unverifiable for a demo application.

The realistic value is: better information at the decision point → more
correct segregation → less contamination → more effective recycling and composting.

---

## Hackathon Eligibility

- ✅ Track 03: Waste and Energy
- ✅ Environmental problem addressed
- ✅ AWS service used (Amplify Hosting)
- ✅ Original project (built for this hackathon)
- ✅ Team: ASAP (solo entry)
