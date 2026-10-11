# SortSahi AI — Classification Guide

## Knowledge Base Authority

All waste classification guidance in SortSahi AI is based on:

- **Solid Waste Management Rules, 2016** (Ministry of Environment, Forest and Climate Change, Government of India)
- **CPHEEO Manual on Solid Waste Management, 2000** (Central Public Health and Environmental Engineering Organisation)
- **Swachh Bharat Mission** household segregation guidelines
- Common four-bin municipal practice: BBMP Bengaluru, MCD Delhi, BMC Mumbai

> **Disclaimer:** Local municipal guidelines vary. SortSahi AI provides general guidance based on national rules and common practice. Always verify with your local municipal authority for specific local requirements.

---

## The Four Waste Streams

### 🟢 Wet Waste (Green Bin)
Biodegradable organic material.

**Characteristics:**
- Decomposes naturally within weeks
- Can be composted or processed in biogas units
- Should not be mixed with non-biodegradable material

**Examples in knowledge base:**
- Fruit and vegetable peels (banana peel, potato peel, orange peel)
- Leftover cooked food (rice, dal, roti, sabzi)
- Tea leaves and coffee grounds
- Garden and plant waste (dry leaves, grass clippings, puja flowers)
- Eggshells
- Coconut shell and husk

**Preparation tips:**
- Drain excess liquid before discarding
- Remove food from packaging — packaging goes to dry waste
- Avoid plastic bags in wet waste bins — they slow composting

---

### 🔵 Dry Waste (Blue Bin)
Recyclable material — clean and dry.

**Characteristics:**
- Can be recycled when clean and free of contamination
- Often sold to kabadiwala (scrap dealers) for effective local recycling
- Contamination (grease, food, moisture) makes many items unrecyclable

**Examples in knowledge base:**
- Paper and newspaper (clean, dry only)
- Cardboard (clean, dry only — food-soiled portions go to wet waste)
- Plastic bottles and containers (rinsed)
- Glass bottles and jars (rinsed; broken glass: wrapped carefully)
- Metal cans and tins (rinsed)
- Plastic bags and film
- Tetra Pak cartons (rinsed and flattened)
- Thermocol / expanded polystyrene
- Broken crockery (wrapped; NOT in glass recycling)
- Rubber items
- Old clothes and textiles

**Critical rule:** Contamination breaks recyclability. Food-stained paper, greasy cardboard,
and unwashed plastic cannot be recycled and should go to wet waste or general waste.

---

### 🟣 Sanitary Waste (Red/Black Bin)
Hygiene and sanitary products.

**Characteristics:**
- Contaminated with body fluids — cannot be recycled
- Should be wrapped before disposal
- Must NOT be flushed — causes drain blockages
- Many municipalities use incinerators for this stream

**Examples in knowledge base:**
- Sanitary pads and tampons
- Baby diapers and adult diapers
- Used tissues and wet wipes (including "flushable" wipes — never flush)
- Used bandages and medical dressings

**Key rule:** Wrapping is essential. Use original packaging, newspaper, or a paper bag.

---

### 🔴 Special-Care / Hazardous Waste
Items that require special disposal routes.

**Characteristics:**
- Contains toxic, hazardous, or valuable materials
- Must NOT go in any regular bin
- Requires designated collection points, take-back programmes, or municipal hazardous waste events

**Examples in knowledge base:**
- Batteries (AA, AAA, alkaline, button cells) — take to collection points in electronics stores
- Electronic waste — phones, laptops, chargers, cables, earphones — use brand take-back or authorised e-waste recyclers (Attero, E-Parisaraa)
- Expired or unused medicines — return to pharmacy or medicine take-back programme
- CFL bulbs and fluorescent tubes (contain mercury) — hazardous waste collection
- LED bulbs — e-waste collection
- Paints, solvents, and household chemicals — hazardous waste facility
- Syringes and needles (sharps) — sharps container → pharmacy or health centre
- Pressurised aerosol cans (partially full) — hazardous waste

---

## Conditional Classification

Some items cannot be classified correctly without additional information.
SortSahi AI asks follow-up questions in these cases:

| Item | Question | Possible outcomes |
|------|----------|------------------|
| Paper | Clean and dry, or food-stained? | Dry waste (clean) / Wet waste (stained) |
| Cardboard | Clean or greasy (pizza box)? | Dry waste (clean) / Split: clean=dry, greasy=wet |
| Tea bag | Paper bag, plastic mesh, or loose leaves? | Wet waste (all leaves) / Dry waste (plastic mesh bag) |
| Aerosol can | Completely empty or still pressurised? | Dry waste (empty) / Special-care (pressurised) |

---

## Items Not in Knowledge Base

When an item is not found, SortSahi AI:
1. States clearly that no reviewed rule matched the item
2. Does not force an unknown item into one of the four categories
3. Asks the user to provide a more specific name or describe the material and condition
4. Advises keeping potentially hazardous items separate while the user checks an approved local collection route
5. Directs the user to local municipal guidance where needed

SortSahi AI never presents an unknown-item response as a confirmed classification.

---

## AI Classification Limitations

When using image classification:
- The AI identifies the item from visual evidence only
- It cannot determine contamination level, material composition, or local facility availability
- Conditional follow-up questions are asked when the visual cannot resolve the classification
- All disposal guidance comes from the reviewed knowledge base, not from AI free-form generation

---

## Sources

| Source | URL |
|--------|-----|
| Applicable Solid Waste Management Rules and current official guidance | https://moef.gov.in/en/divisions/cpheeo/solid-waste-management/ |
| E-Waste Rules 2022 | https://cpcb.nic.in/e-waste/ |
| Plastic Waste Management Rules | https://www.moef.gov.in/rules/plastic-waste |
| Biomedical Waste Rules 2016 | https://cpcb.nic.in/bio-medical-waste/ |
| Hazardous Waste Rules | https://cpcb.nic.in/hazardous-waste/ |
| Swachh Bharat Mission | https://sbm.gov.in/ |
