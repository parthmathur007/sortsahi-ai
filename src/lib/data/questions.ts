/**
 * SortSahi AI — Daily Challenge Question Bank
 *
 * All classification answers verified against:
 * - Solid Waste Management Rules, 2016 (MoEFCC)
 * - CPHEEO Swachh Bharat guidelines
 * - Common municipal segregation practice in India (BBMP Bengaluru, MCD Delhi, BMC Mumbai)
 *
 * Questions cover common and confusing household waste items.
 */

import type { ChallengeQuestion } from "@/types";

export const QUESTION_BANK: ChallengeQuestion[] = [
  {
    id: "q001",
    questionText: "Where should you put a banana peel?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Banana peels are biodegradable organic matter and go in the green (wet waste) bin. They are excellent for composting.",
    tip: "Fruit and vegetable peels are always wet waste — they break down naturally.",
    source: "SWM Rules 2016 — biodegradable waste",
    tags: ["wet", "kitchen", "organic"],
  },
  {
    id: "q002",
    questionText: "A clean, dry newspaper — which bin does it go in?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Clean, dry newspaper is recyclable and goes in the blue (dry waste) bin. It can also be sold to a kabadiwala (scrap dealer).",
    tip: "Wet or food-stained paper CANNOT be recycled — only put clean, dry paper in dry waste.",
    source: "SWM Rules 2016 — recyclable waste",
    tags: ["dry", "paper", "recyclable"],
  },
  {
    id: "q003",
    questionText: "You have used a sanitary pad. Where should you dispose of it?",
    options: [
      { id: "a", text: "Flush down the toilet", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste / recycling)", stream: "dry" },
      { id: "c", text: "Red/Black bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Used sanitary pads are sanitary waste. Wrap them in newspaper or paper and place in the red/black sanitary waste bin. Never flush — it blocks drains.",
    tip: "Always wrap sanitary products before disposal to maintain hygiene.",
    source: "SWM Rules 2016 — sanitary waste",
    tags: ["sanitary", "hygiene"],
  },
  {
    id: "q004",
    questionText: "A used AA battery from your TV remote — how should you dispose of it?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Drop in any dustbin nearby", stream: "wet" },
      { id: "d", text: "Battery collection point or e-waste facility", stream: "special" },
    ],
    correctOptionId: "d",
    explanation:
      "Batteries contain toxic metals like mercury and cadmium. They must go to dedicated battery collection points (many electronics stores have these) — never in regular bins.",
    tip: "Tape the terminals with adhesive tape before storing used batteries to prevent short circuits.",
    source: "E-Waste (Management) Rules 2022",
    tags: ["special", "battery", "hazardous"],
  },
  {
    id: "q005",
    questionText: "A clean, empty plastic water bottle — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste) after rinsing", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "A clean, empty PET plastic bottle is recyclable. Rinse it, crush it to save space, and place in the blue dry waste bin. Kabadiwala also accept them.",
    tip: "Always rinse plastic bottles before recycling — residue can contaminate entire recycling batches.",
    source: "Plastic Waste Management Rules 2016",
    tags: ["dry", "plastic", "recyclable"],
  },
  {
    id: "q006",
    questionText: "The bottom of a pizza box is soaked with grease and cheese. What do you do?",
    options: [
      { id: "a", text: "Put the whole box in dry waste recycling", stream: "dry" },
      { id: "b", text: "Put the whole box in wet waste", stream: "wet" },
      { id: "c", text: "Tear off the clean top (dry waste) and put the greasy bottom in wet waste", stream: "wet" },
      { id: "d", text: "Throw the whole box in the dustbin with everything else", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Greasy cardboard cannot be recycled — the grease prevents paper fibres from bonding during recycling. The clean dry top can be recycled; the greasy bottom goes to wet waste/compost.",
    tip: "This is a classic confusing case! Separate what you can save for recycling.",
    source: "SWM Rules 2016 / Common recycling guidance",
    tags: ["dry", "wet", "cardboard", "confusing"],
  },
  {
    id: "q007",
    questionText: "Your old smartphone has stopped working. Where should it go?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Authorised e-waste collection centre or brand take-back", stream: "special" },
      { id: "c", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "d", text: "General dustbin", stream: "wet" },
    ],
    correctOptionId: "b",
    explanation:
      "Mobile phones are e-waste containing hazardous materials. Use brand take-back programmes (Samsung, Apple, etc.) or authorised e-waste recyclers like Attero or E-Parisaraa.",
    tip: "Always delete your personal data before handing over an old phone for recycling!",
    source: "E-Waste (Management) Rules 2022",
    tags: ["special", "ewaste", "hazardous"],
  },
  {
    id: "q008",
    questionText: "Used tea leaves (loose, no bag) — where do they go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Down the kitchen drain", stream: "wet" },
      { id: "d", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
    ],
    correctOptionId: "a",
    explanation:
      "Used tea leaves are organic and biodegradable — perfect for the green (wet waste) bin or a compost heap. They are nitrogen-rich and excellent for gardens.",
    tip: "Used tea and coffee grounds are great compost additions!",
    source: "SWM Rules 2016",
    tags: ["wet", "kitchen", "organic"],
  },
  {
    id: "q009",
    questionText: "An empty glass pickle jar — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste) after rinsing", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Clean glass jars and bottles are recyclable. Rinse the jar and place in the blue dry waste bin. Glass has excellent recycling value.",
    tip: "Remove the metal lid separately — both lid and jar can go in dry waste.",
    source: "SWM Rules 2016",
    tags: ["dry", "glass", "recyclable"],
  },
  {
    id: "q010",
    questionText: "A used bandage / Band-Aid with dried blood — which bin?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Red/Black bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Flush down the toilet", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Used bandages contaminated with body fluids are sanitary waste. Wrap in paper and place in the sanitary/general waste bin. Never put in recycling.",
    tip: "Never put used medical dressings or bandages in recycling — they contaminate entire batches.",
    source: "SWM Rules 2016 / Biomedical Waste Management Rules 2016",
    tags: ["sanitary", "medical"],
  },
  {
    id: "q011",
    questionText: "Leftover cooked rice and dal — where should they go?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Down the kitchen drain", stream: "wet" },
      { id: "d", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
    ],
    correctOptionId: "b",
    explanation:
      "Cooked food waste is biodegradable and goes in the green (wet waste) bin. It can be composted or processed in community biogas units.",
    tip: "Drain excess liquid from food waste before putting in the wet waste bin to reduce mess.",
    source: "SWM Rules 2016",
    tags: ["wet", "kitchen", "food"],
  },
  {
    id: "q012",
    questionText: "Expired cough syrup medicine — how do you dispose of it?",
    options: [
      { id: "a", text: "Pour down the sink", stream: "wet" },
      { id: "b", text: "Put in the general dustbin", stream: "dry" },
      { id: "c", text: "Return to a pharmacy or medicine take-back programme", stream: "special" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Medicines must not be flushed or put in general bins — they contaminate water and soil. Return to a pharmacy that accepts expired medicines, or contact your municipality's hazardous waste service.",
    tip: "Remove your personal details from prescription labels before returning medicines.",
    source: "WHO guidance / Common Indian municipal practice",
    tags: ["special", "medicine", "hazardous"],
  },
  {
    id: "q013",
    questionText: "A CFL (compact fluorescent) bulb that has stopped working — where does it go?",
    options: [
      { id: "a", text: "General dustbin", stream: "dry" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Authorised CFL / hazardous waste collection point", stream: "special" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "CFL bulbs contain mercury, a hazardous substance. They must go to authorised collection centres — not general bins. Handle carefully and do not break.",
    tip: "Many municipalities have CFL collection bins. Never break a CFL — mercury vapour is harmful.",
    source: "Hazardous Waste Rules",
    tags: ["special", "hazardous", "mercury"],
  },
  {
    id: "q014",
    questionText: "Dry leaves and plant cuttings from your garden or balcony — which bin?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Burn them in the garden", stream: "wet" },
    ],
    correctOptionId: "a",
    explanation:
      "Garden waste — including dry leaves, grass clippings, and plant cuttings — is biodegradable organic matter that goes in the green (wet waste) bin. It is excellent for composting.",
    tip: "Dry leaves are excellent mulch for plants or a great addition to a compost pile.",
    source: "SWM Rules 2016",
    tags: ["wet", "garden", "organic"],
  },
  {
    id: "q015",
    questionText: "An empty aluminium cold drink can — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste) after rinsing", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Clean aluminium cans are highly recyclable and go in the blue dry waste bin. Aluminium has excellent recycling value — kabadiwala pay well for it.",
    tip: "Rinse the can and crush it to save space in your bin!",
    source: "SWM Rules 2016",
    tags: ["dry", "metal", "recyclable"],
  },
  {
    id: "q016",
    questionText: "A used tissue paper (you blew your nose into it) — where does it go?",
    options: [
      { id: "a", text: "Blue bin (paper recycling)", stream: "dry" },
      { id: "b", text: "Flush down the toilet", stream: "wet" },
      { id: "c", text: "Red/Black bin (Sanitary / general waste)", stream: "sanitary" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Used tissues are contaminated with body fluids and cannot be recycled. They go in the sanitary/general waste bin. Do not flush wet wipes, even if labelled 'flushable' — they block drains.",
    tip: "Clean, unused tissue paper can go in paper recycling. Used tissues cannot.",
    source: "SWM Rules 2016",
    tags: ["sanitary", "hygiene", "tissue"],
  },
  {
    id: "q017",
    questionText: "Thermocol (expanded polystyrene / Styrofoam) packing material — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Burn it at home", stream: "special" },
      { id: "d", text: "Break into pieces and put in any bin", stream: "dry" },
    ],
    correctOptionId: "b",
    explanation:
      "Thermocol goes in the dry waste bin, but it is difficult to recycle in most Indian cities. Never burn thermocol — it releases toxic fumes. Check if your municipality has a special collection.",
    tip: "Reuse thermocol packing wherever possible to reduce waste.",
    source: "SWM Rules 2016",
    tags: ["dry", "plastic", "packaging"],
  },
  {
    id: "q018",
    questionText: "A used baby diaper — where should it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red/Black bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Flush it down the toilet", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Used diapers are sanitary waste. Fold and seal using the diaper's own tabs, wrap in newspaper, and place in the sanitary waste bin. Never flush — it causes serious blockages.",
    tip: "Wrap the diaper tightly before disposal to maintain hygiene.",
    source: "SWM Rules 2016",
    tags: ["sanitary", "hygiene", "baby"],
  },
  {
    id: "q019",
    questionText: "Broken crockery (a smashed cup or plate) — where does it go?",
    options: [
      { id: "a", text: "Glass recycling bin", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Blue bin (Dry Waste) wrapped in newspaper", stream: "dry" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "c",
    explanation:
      "Broken crockery and ceramics are NOT recyclable with glass. Wrap carefully in several layers of newspaper, label 'SHARP', and place in the dry waste bin.",
    tip: "Ceramics and crockery contaminate glass recycling — always keep them separate!",
    source: "Common municipal guidance",
    tags: ["dry", "non-recyclable", "sharp"],
  },
  {
    id: "q020",
    questionText: "Eggshells — which bin do they go in?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Eggshells are organic and biodegradable — they go in the green (wet waste) bin. Crushed eggshells are a valuable compost addition and soil amendment.",
    tip: "Crush eggshells to speed up decomposition in compost.",
    source: "SWM Rules 2016",
    tags: ["wet", "kitchen", "organic"],
  },
  {
    id: "q021",
    questionText: "An old mobile phone charger and USB cable — how should you dispose of them?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "General dustbin", stream: "dry" },
      { id: "c", text: "Authorised e-waste collection centre or brand take-back", stream: "special" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Chargers and cables are e-waste. They contain metals and plastics that require proper recycling. Take to authorised e-waste centres or brand take-back programmes.",
    tip: "Many electronics stores accept old chargers and cables for e-waste recycling.",
    source: "E-Waste (Management) Rules 2022",
    tags: ["special", "ewaste"],
  },
  {
    id: "q022",
    questionText: "Coconut shell and dry coconut husk — where do they go?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "General dustbin", stream: "wet" },
    ],
    correctOptionId: "b",
    explanation:
      "Coconut shells and husk are organic and biodegradable. They go in the green (wet waste) bin and are excellent for composting. Break larger shells into pieces for faster composting.",
    source: "SWM Rules 2016",
    tags: ["wet", "kitchen", "organic"],
  },
  {
    id: "q023",
    questionText: "A Tetra Pak juice carton (rinsed and flattened) — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Special-care disposal", stream: "special" },
    ],
    correctOptionId: "b",
    explanation:
      "Tetra Pak cartons are multi-layer packaging and go in the dry waste bin. Some supermarkets have dedicated Tetra Pak collection points for proper recycling.",
    tip: "Rinse and fully open/flatten the carton before disposal to reduce odours.",
    source: "SWM Rules 2016",
    tags: ["dry", "packaging", "carton"],
  },
  {
    id: "q024",
    questionText: "Puja (worship) flowers — where should they go?",
    options: [
      { id: "a", text: "Into rivers or water bodies (traditional practice)", stream: "wet" },
      { id: "b", text: "Green bin (Wet Waste) for composting", stream: "wet" },
      { id: "c", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "d", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
    ],
    correctOptionId: "b",
    explanation:
      "Puja flowers are organic and biodegradable — the green (wet waste) bin for composting is the environmentally correct option. Disposing of flowers in rivers causes water pollution and reduces oxygen levels.",
    tip: "Several NGOs collect puja flowers and convert them to natural dyes, incense, or compost — look for these in your city!",
    source: "SWM Rules 2016 / Environmental guidance",
    tags: ["wet", "organic", "confusing"],
  },
  {
    id: "q025",
    questionText: "A half-used aerosol can of air freshener still has product inside — where does it go?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste / metal)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Hazardous / special-care waste collection", stream: "special" },
      { id: "d", text: "Puncture the can and put in dry waste", stream: "dry" },
    ],
    correctOptionId: "c",
    explanation:
      "Pressurised aerosol cans with remaining product are hazardous — they can explode if punctured or exposed to heat. Take to a special-care / hazardous waste collection point. An empty aerosol can (metal) can go in dry waste.",
    tip: "Never puncture aerosol cans — even 'empty' ones may have residual pressure.",
    source: "Hazardous Waste Rules",
    tags: ["special", "hazardous", "confusing"],
  },
  {
    id: "q026",
    questionText: "Used cotton swabs / ear buds — where do they go?",
    options: [
      { id: "a", text: "Flush down the toilet", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red/Black bin (Sanitary / General waste)", stream: "sanitary" },
      { id: "d", text: "Green bin (Wet Waste)", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Used cotton swabs are contaminated and go in the sanitary/general waste bin. Do NOT flush — they are one of the most common causes of drain blockages worldwide.",
    source: "Common municipal guidance",
    tags: ["sanitary", "hygiene"],
  },
  {
    id: "q027",
    questionText: "Old, unwearable clothes and torn fabrics — which bin?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "Donate or use Goonj / textile collection drive", stream: "dry" },
    ],
    correctOptionId: "b",
    explanation:
      "Textile waste goes in the dry waste bin, but a better option is donating to Goonj or a local NGO, or using textile collection bins in malls. Even torn clothes can be reused as cleaning rags.",
    tip: "Before discarding, ask: Can this be repaired, donated, or repurposed as a cleaning cloth?",
    source: "SWM Rules 2016",
    tags: ["dry", "textile", "reuse"],
  },
  {
    id: "q028",
    questionText: "A used plastic straw — where does it go?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste / recyclable plastic)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Blue bin (Dry Waste) — but it is hard to recycle", stream: "dry" },
      { id: "d", text: "Flush down the toilet", stream: "wet" },
    ],
    correctOptionId: "c",
    explanation:
      "Plastic straws technically go in the dry waste bin, but they are too small to be sorted in most recycling facilities and typically end up as waste. The best approach: switch to reusable/bamboo straws and avoid single-use plastic straws altogether.",
    tip: "Single-use plastic straws below 75 microns are banned in India under Plastic Waste Management Rules.",
    source: "Plastic Waste Management Amendment Rules 2021",
    tags: ["dry", "plastic", "confusing"],
  },
  {
    id: "q029",
    questionText: "Mango seeds and kernel — which bin?",
    options: [
      { id: "a", text: "Blue bin (Dry Waste)", stream: "dry" },
      { id: "b", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "c", text: "Red bin (Sanitary Waste)", stream: "sanitary" },
      { id: "d", text: "General dustbin (mixed)", stream: "wet" },
    ],
    correctOptionId: "b",
    explanation:
      "Fruit seeds and kernels are organic matter and go in the green (wet waste) bin for composting. Large seeds (like mango kernel) can take longer to decompose but will break down.",
    source: "SWM Rules 2016",
    tags: ["wet", "kitchen", "organic"],
  },
  {
    id: "q030",
    questionText: "An empty insecticide spray bottle (completely empty, no liquid remaining) — where does it go?",
    options: [
      { id: "a", text: "Green bin (Wet Waste)", stream: "wet" },
      { id: "b", text: "Blue bin (Dry Waste — plastic recycling)", stream: "dry" },
      { id: "c", text: "Special-care disposal", stream: "special" },
      { id: "d", text: "Flush out with water and put in blue bin", stream: "dry" },
    ],
    correctOptionId: "c",
    explanation:
      "Even 'empty' insecticide containers retain chemical residues. They are classified as hazardous waste and should go to special-care disposal — not regular recycling. Contact your municipality for hazardous household waste collection.",
    tip: "Never reuse insecticide or chemical containers for other purposes.",
    source: "Hazardous Waste Rules",
    tags: ["special", "hazardous", "chemical"],
  },
];

// ─────────────────────────────────────────────────────────────
// Daily challenge selection — deterministic from date
// ─────────────────────────────────────────────────────────────

/**
 * Returns the same question for all users on the same calendar day.
 * Uses a simple date-seed modulo approach.
 */
export function getDailyChallenge(dateStr?: string): ChallengeQuestion {
  const now = new Date();
  const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const date = dateStr ?? localDate; // User-local YYYY-MM-DD
  // Sum char codes of date string as a simple seed
  // Convert the local calendar date to a day number. Consecutive dates select
  // consecutive questions, so the daily challenge reliably changes tomorrow.
  const [year, month, day] = date.split("-").map(Number);
  const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  const index = ((dayNumber % QUESTION_BANK.length) + QUESTION_BANK.length) % QUESTION_BANK.length;
  return QUESTION_BANK[index];
}

/**
 * Returns a random question, excluding already-seen IDs.
 */
export function getRandomQuestion(excludeIds: string[] = []): ChallengeQuestion {
  const available = QUESTION_BANK.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) return QUESTION_BANK[0];
  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}
