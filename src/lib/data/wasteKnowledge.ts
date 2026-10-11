/**
 * SortSahi AI — Waste Knowledge Base
 *
 * Classification guidance based on:
 * - Solid Waste Management Rules, 2016 (MoEFCC, Government of India)
 * - CPHEEO Manual on Solid Waste Management 2000
 * - Swachh Bharat Mission segregation guidelines (wet / dry / sanitary / hazardous)
 * - Common municipal practice in Indian cities (Bengaluru BBMP, Delhi MCD, Mumbai BMC)
 *
 * Note: Local municipal guidelines vary. Always verify with your local municipal authority.
 * Source: https://moef.gov.in/en/divisions/cpheeo/solid-waste-management/
 */

import type { WasteItem } from "@/types";

export const WASTE_KNOWLEDGE_BASE: WasteItem[] = [
  // ─────────────────────────────────────────────────────────────
  // WET WASTE — Biodegradable / Organic
  // ─────────────────────────────────────────────────────────────
  {
    id: "ww-fruit-peels",
    name: "Fruit and Vegetable Peels",
    aliases: ["banana peel", "apple peel", "orange peel", "potato peel", "vegetable peels", "fruit peels", "fruit skin", "veggie peels"],
    stream: "wet",
    shortExplanation:
      "Fruit and vegetable peels are biodegradable organic matter. They decompose naturally and are excellent for composting.",
    disposalInstructions: [
      "Place in the green (wet waste) bin.",
      "Ideally compost at home using a compost bin or kitchen composter.",
      "If composting is not possible, ensure peels are not mixed with non-biodegradable items.",
      "Do not put peels in plastic bags — they slow decomposition and complicate processing.",
    ],
    preparationTips: [
      "You may chop peels into smaller pieces to speed up composting.",
      "Citrus peels in large quantities can slow composting — use in moderation.",
    ],
    tags: ["organic", "kitchen", "compost", "biodegradable", "food"],
    examples: ["Banana peel", "Mango skin", "Onion skin", "Potato peel", "Carrot tops"],
    source: "SWM Rules 2016 — biodegradable waste",
  },
  {
    id: "ww-cooked-food",
    name: "Leftover Cooked Food",
    aliases: ["leftover food", "cooked food", "food waste", "food scraps", "dal", "rice", "sabzi", "curry", "roti", "bread"],
    stream: "wet",
    shortExplanation:
      "Cooked food scraps are organic and biodegradable. They should go in the wet waste bin for composting or biogas processing.",
    disposalInstructions: [
      "Place in the green (wet waste) bin.",
      "Drain excess liquids before discarding.",
      "Consider home composting or community biogas units.",
      "Do not pour oily or liquid food waste in large quantities into drains.",
    ],
    preparationTips: [
      "Remove food from packaging and wrappers before discarding.",
      "Excess oil or ghee: absorb with newspaper before adding to compost.",
    ],
    tags: ["organic", "kitchen", "food", "compost", "biodegradable"],
    examples: ["Leftover dal", "Stale roti", "Rice", "Vegetable curry", "Bread"],
    source: "SWM Rules 2016",
  },
  {
    id: "ww-tea-coffee",
    name: "Tea Leaves and Coffee Grounds",
    aliases: ["tea leaves", "used tea bags", "coffee grounds", "chai waste", "teabag"],
    stream: "wet",
    shortExplanation:
      "Used tea leaves and coffee grounds are excellent compostable organic material.",
    disposalInstructions: [
      "Place in the green (wet waste) bin.",
      "Tea leaves without plastic bags are ideal for composting.",
      "Remove staples from paper tea bags before composting.",
    ],
    preparationTips: [
      "If the tea bag is plastic mesh (like nylon), separate the bag (dry waste) and compost only the leaves.",
      "Coffee grounds are nitrogen-rich — great for compost.",
    ],
    conditionalRules: [
      {
        condition: "The tea bag material matters",
        question: "What type of tea bag do you have?",
        options: [
          {
            label: "Paper tea bag",
            stream: "wet",
            explanation: "Paper tea bags (bag + leaves) are compostable. Remove any staple.",
            disposalInstructions: [
              "Place tea bag and leaves in green wet waste bin.",
              "Remove the staple if present.",
            ],
          },
          {
            label: "Plastic / nylon mesh bag",
            stream: "wet",
            explanation: "Empty the leaves into wet waste. The plastic mesh bag goes to dry waste.",
            disposalInstructions: [
              "Empty tea leaves into the green wet waste bin.",
              "Put the empty nylon/plastic mesh bag in the dry waste (blue) bin.",
            ],
          },
          {
            label: "Loose tea leaves",
            stream: "wet",
            explanation: "Loose leaves go directly in the wet waste / compost.",
            disposalInstructions: ["Place directly in the green wet waste bin or compost."],
          },
        ],
      },
    ],
    tags: ["organic", "kitchen", "compost", "beverage"],
    source: "SWM Rules 2016",
  },
  {
    id: "ww-garden-waste",
    name: "Garden and Plant Waste",
    aliases: ["dry leaves", "garden waste", "plant cuttings", "flowers", "grass clippings", "flower offerings", "puja flowers"],
    stream: "wet",
    shortExplanation:
      "Plant matter — including dry leaves, grass clippings, flower offerings, and garden trimmings — is biodegradable organic waste.",
    disposalInstructions: [
      "Place in the green (wet waste) bin.",
      "Dry leaves are excellent for composting or mulching.",
      "Puja / worship flowers should go to composting, not sacred river disposal (environmental guidance).",
      "Avoid putting large woody branches in a regular bin — arrange separate collection with your municipality.",
    ],
    tags: ["organic", "garden", "compost", "biodegradable"],
    source: "SWM Rules 2016",
  },
  {
    id: "ww-eggshells",
    name: "Eggshells",
    aliases: ["egg shells", "broken eggs", "eggshell"],
    stream: "wet",
    shortExplanation:
      "Eggshells are organic and biodegradable. They are a valuable addition to compost.",
    disposalInstructions: [
      "Rinse lightly and place in the green (wet waste) bin.",
      "Crushed eggshells are an excellent compost and soil amendment.",
    ],
    tags: ["organic", "kitchen", "compost"],
    source: "SWM Rules 2016",
  },

  // ─────────────────────────────────────────────────────────────
  // DRY WASTE — Recyclable
  // ─────────────────────────────────────────────────────────────
  {
    id: "dw-paper",
    name: "Paper and Newspaper",
    aliases: ["newspaper", "paper", "old newspaper", "office paper", "white paper", "notebook", "books", "magazines", "pamphlets"],
    stream: "dry",
    shortExplanation:
      "Clean, dry paper is recyclable. It can be collected by kabadiwala (scrap dealers) or municipal dry waste facilities.",
    disposalInstructions: [
      "Place in the blue (dry waste) bin.",
      "Keep paper clean and dry — wet or food-soiled paper is not recyclable.",
      "Flatten books and magazines to save space.",
      "Many kabadiwala (scrap dealers) accept old newspapers — a common and effective recycling route in India.",
    ],
    preparationTips: [
      "Remove plastic covers or sleeves from magazines.",
      "Food-stained paper (e.g. used napkins) is NOT recyclable — see sanitary/wet waste.",
    ],
    conditionalRules: [
      {
        condition: "Paper may be food-contaminated",
        question: "Is the paper clean and dry, or is it greasy/food-stained?",
        options: [
          {
            label: "Clean and dry paper",
            stream: "dry",
            explanation: "Clean paper is recyclable.",
            disposalInstructions: [
              "Place in the blue dry waste bin.",
              "Bundle newspapers and sell to kabadiwala for effective recycling.",
            ],
          },
          {
            label: "Greasy, wet, or food-stained paper",
            stream: "wet",
            explanation: "Food-contaminated paper cannot be recycled. Composting is the best option.",
            disposalInstructions: [
              "Place in the green wet waste bin.",
              "Food-contaminated paper breaks down well in compost.",
            ],
          },
        ],
      },
    ],
    tags: ["recyclable", "paper", "kabadiwala", "stationery"],
    source: "SWM Rules 2016 — dry recyclable waste",
  },
  {
    id: "dw-cardboard",
    name: "Cardboard",
    aliases: ["cardboard", "carton", "corrugated box", "shipping box", "amazon box", "delivery box", "packaging box", "cereal box"],
    stream: "dry",
    shortExplanation:
      "Clean, dry cardboard is recyclable. It is one of the most commonly recycled materials.",
    disposalInstructions: [
      "Place in the blue (dry waste) bin.",
      "Break down and flatten boxes to save space.",
      "Remove tape, staples, and plastic packaging before recycling.",
      "Sell to kabadiwala for effective local recycling.",
    ],
    preparationTips: [
      "Ensure boxes are clean and dry.",
      "Pizza boxes or food-soaked boxes: only clean portions can be recycled. The greasy bottom section goes to wet waste / compost.",
    ],
    conditionalRules: [
      {
        condition: "Cardboard box may be food-contaminated",
        question: "Is the cardboard box clean, or is it greasy/wet from food?",
        options: [
          {
            label: "Clean and dry cardboard",
            stream: "dry",
            explanation: "Recyclable. Flatten and place in dry waste bin.",
            disposalInstructions: [
              "Flatten the box.",
              "Place in blue dry waste bin.",
              "Remove any tape, staples, or plastic before recycling.",
            ],
          },
          {
            label: "Food-greasy or soaked (e.g. pizza box bottom)",
            stream: "wet",
            explanation: "Grease prevents recycling of paper fibers. Tear off the clean top half to recycle, put the soiled part in wet waste.",
            disposalInstructions: [
              "Tear the clean dry section and put in dry waste.",
              "Tear the food-soiled section and put in wet waste / compost.",
            ],
          },
        ],
      },
    ],
    tags: ["recyclable", "packaging", "cardboard", "kabadiwala"],
    source: "SWM Rules 2016",
  },
  {
    id: "dw-plastic-bottle",
    name: "Plastic Bottles and Containers",
    aliases: ["plastic bottle", "water bottle", "cold drink bottle", "shampoo bottle", "plastic container", "pet bottle", "juice bottle"],
    stream: "dry",
    shortExplanation:
      "Rinsed plastic bottles (types 1–2 PET/HDPE) are recyclable dry waste. Always rinse before discarding.",
    disposalInstructions: [
      "Rinse the bottle to remove any residue.",
      "Place in the blue (dry waste) bin.",
      "Remove caps if possible (caps may be a different plastic type).",
      "Crush the bottle to save space.",
      "Kabadiwala and plastic recyclers accept clean PET bottles.",
    ],
    preparationTips: [
      "Check for recycling codes 1 (PET) and 2 (HDPE) — most commonly accepted.",
      "Heavily contaminated bottles (chemical residue, oil) may need special disposal.",
    ],
    tags: ["recyclable", "plastic", "packaging", "pet"],
    source: "SWM Rules 2016 / Plastic Waste Management Rules 2016",
  },
  {
    id: "dw-glass",
    name: "Glass Bottles and Jars",
    aliases: ["glass bottle", "glass jar", "broken glass", "wine bottle", "pickle jar", "glass container"],
    stream: "dry",
    shortExplanation:
      "Clean glass bottles and jars are recyclable. Handle broken glass carefully to avoid injury.",
    disposalInstructions: [
      "Rinse clean and place in the blue (dry waste) bin.",
      "Broken glass: wrap carefully in several layers of newspaper, then tape the package shut before placing in dry waste bin.",
      "Glass can be sold to kabadiwala.",
    ],
    preparationTips: [
      "Remove metal lids (recyclable separately in dry waste).",
      "Pyrex / oven glass / ceramics: NOT recyclable with regular glass — dispose separately.",
    ],
    tags: ["recyclable", "glass", "kabadiwala"],
    source: "SWM Rules 2016",
  },
  {
    id: "dw-metal-cans",
    name: "Metal Cans and Tins",
    aliases: ["tin can", "aluminium can", "steel can", "beverage can", "food can", "metal container", "biscuit tin", "cold drink can"],
    stream: "dry",
    shortExplanation:
      "Clean metal cans and tins are highly recyclable. Metal has excellent recycling value.",
    disposalInstructions: [
      "Rinse out any food or liquid residue.",
      "Place in the blue (dry waste) bin.",
      "Flatten cans to save space.",
      "Kabadiwala and scrap dealers pay well for aluminium and steel.",
    ],
    tags: ["recyclable", "metal", "aluminium", "steel", "kabadiwala"],
    source: "SWM Rules 2016",
  },
  {
    id: "dw-plastic-bag",
    name: "Plastic Bags and Film",
    aliases: ["plastic bag", "polythene bag", "carry bag", "plastic wrap", "cling film", "plastic film", "packet", "pouch"],
    stream: "dry",
    shortExplanation:
      "Plastic bags and thin film plastic can go in dry waste, but they are difficult to recycle. Reduce single-use bags wherever possible.",
    disposalInstructions: [
      "Place in the blue (dry waste) bin.",
      "Do NOT put in wet waste — plastic contamination disrupts composting.",
      "Many supermarkets and shops have plastic bag collection points.",
      "Prefer cloth bags or reusable bags to reduce plastic waste.",
    ],
    preparationTips: [
      "Plastic bags below 75 microns are banned in India — avoid using them.",
      "Used plastic bags can be reused for bin liners before final disposal.",
    ],
    tags: ["plastic", "packaging", "recyclable", "single-use"],
    source: "Plastic Waste Management Rules 2016",
  },
  {
    id: "dw-tetrapack",
    name: "Tetra Packs and Juice Cartons",
    aliases: ["tetrapack", "juice box", "milk carton", "tetra pak", "juice carton", "amul milk packet"],
    stream: "dry",
    shortExplanation:
      "Tetra Pak cartons are multi-layer packaging (paper, aluminium, plastic). They go in dry waste and are collected by some recyclers.",
    disposalInstructions: [
      "Rinse and flatten the carton.",
      "Place in the blue (dry waste) bin.",
      "Look for Tetra Pak collection bins in some supermarkets.",
    ],
    preparationTips: ["Open the carton fully and allow it to dry to prevent odours."],
    tags: ["recyclable", "packaging", "carton", "tetrapack"],
    source: "SWM Rules 2016",
  },

  // ─────────────────────────────────────────────────────────────
  // SANITARY WASTE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sw-sanitary-pad",
    name: "Sanitary Pads and Tampons",
    aliases: ["sanitary pad", "sanitary napkin", "tampon", "menstrual product", "period pad", "wings pad"],
    stream: "sanitary",
    shortExplanation:
      "Used sanitary products are sanitary waste. They must be wrapped before disposal and should not be flushed or mixed with dry/wet waste.",
    disposalInstructions: [
      "Wrap used pad or tampon in its original wrapper, or in newspaper / a paper bag.",
      "Place in the red/black (sanitary waste) bin.",
      "Do NOT flush — causes serious drain blockages.",
      "Do NOT put in recycling — they cannot be recycled.",
      "Many apartment complexes and municipal areas have sanitary waste incinerators.",
    ],
    preparationTips: [
      "Municipal incinerators are the preferred disposal route for sanitary waste.",
      "Some brands offer biodegradable pads — confirm with the brand; even biodegradable products should go through proper sanitary waste channels.",
    ],
    tags: ["sanitary", "hygiene", "menstrual"],
    source: "SWM Rules 2016 — sanitary waste",
  },
  {
    id: "sw-diaper",
    name: "Baby Diapers and Adult Diapers",
    aliases: ["diaper", "nappy", "baby diaper", "adult diaper", "disposable diaper"],
    stream: "sanitary",
    shortExplanation:
      "Diapers are sanitary waste. They must be wrapped and disposed in the sanitary waste bin, not flushed or mixed with dry waste.",
    disposalInstructions: [
      "Fold the used diaper and seal with its own tabs.",
      "Wrap in newspaper or a paper bag.",
      "Place in the red/black (sanitary waste) bin.",
      "Do NOT flush — causes severe drain and sewage blockages.",
    ],
    tags: ["sanitary", "hygiene", "baby"],
    source: "SWM Rules 2016",
  },
  {
    id: "sw-tissue-used",
    name: "Used Tissues and Wet Wipes",
    aliases: ["used tissue", "tissue paper", "kleenex", "wet wipe", "baby wipe", "face wipe", "handkerchief tissue"],
    stream: "sanitary",
    shortExplanation:
      "Used tissues and wet wipes are contaminated and cannot be recycled. They go in the sanitary or general waste bin.",
    disposalInstructions: [
      "Place used tissues in the sanitary/general waste bin.",
      "Do NOT put in paper recycling — contaminated tissues ruin paper batches.",
      "Do NOT flush wet wipes, even if labelled 'flushable' — causes drain blockages.",
    ],
    preparationTips: [
      "Unused, clean tissue paper can go in dry waste / paper recycling.",
    ],
    tags: ["sanitary", "hygiene", "tissue"],
    source: "SWM Rules 2016",
  },
  {
    id: "sw-bandage",
    name: "Used Bandages and Medical Dressings",
    aliases: ["bandage", "plaster", "band-aid", "medical dressing", "wound dressing", "cotton bandage"],
    stream: "sanitary",
    shortExplanation:
      "Used bandages and dressings are contaminated with body fluids and must be disposed as sanitary waste.",
    disposalInstructions: [
      "Wrap in paper or tissue and place in the sanitary/general waste bin.",
      "Do not put in dry waste recycling.",
      "For large amounts of clinical/medical waste (healthcare settings), follow biomedical waste rules.",
    ],
    tags: ["sanitary", "medical", "hygiene"],
    source: "SWM Rules 2016 / Biomedical Waste Management Rules 2016",
  },

  // ─────────────────────────────────────────────────────────────
  // SPECIAL-CARE / HAZARDOUS WASTE
  // ─────────────────────────────────────────────────────────────
  {
    id: "sp-battery",
    name: "Batteries",
    aliases: ["battery", "aa battery", "aaa battery", "cell battery", "alkaline battery", "used battery", "torch battery", "remote battery"],
    stream: "special",
    shortExplanation:
      "Batteries contain toxic metals (mercury, cadmium, lead). They must never go in general bins — they require special-care disposal.",
    disposalInstructions: [
      "Do NOT put in any general bin (wet, dry, or sanitary).",
      "Place in a dedicated battery collection point. Many electronic stores (Croma, Vijay Sales) and supermarkets have collection boxes.",
      "Tape the terminals with adhesive tape to prevent short circuits during storage.",
      "Contact your municipality for hazardous waste collection days.",
      "Some brands have take-back schemes — check the battery brand's website.",
    ],
    preparationTips: [
      "Store used batteries in a dry container until you can reach a collection point.",
      "Never put batteries in a fire — they can explode and release toxic fumes.",
    ],
    tags: ["hazardous", "electronic", "battery", "special-care"],
    source: "E-Waste (Management) Rules 2022 / Hazardous Waste Rules",
  },
  {
    id: "sp-ewaste",
    name: "Electronic Waste (E-Waste)",
    aliases: ["e-waste", "old phone", "broken phone", "old laptop", "computer", "electronic device", "earphones", "charger", "keyboard", "monitor", "printer", "circuit board", "hard drive"],
    stream: "special",
    shortExplanation:
      "Electronic waste contains hazardous materials and valuable metals. It requires proper e-waste recycling — not general bin disposal.",
    disposalInstructions: [
      "Do NOT put in any general bin.",
      "Use the Producer Responsibility / Extended Producer Responsibility (EPR) take-back scheme of the brand.",
      "Deposit at authorised e-waste collection centres (check your municipality's website).",
      "Many brands (Samsung, Apple, HP) have trade-in or take-back programmes.",
      "Goonj, Attero, and E-Parisaraa are registered e-waste recyclers in India.",
    ],
    preparationTips: [
      "Delete personal data from devices before handing over.",
      "Keep original accessories and cables together.",
    ],
    tags: ["hazardous", "electronic", "ewaste", "special-care"],
    source: "E-Waste (Management) Rules 2022",
  },
  {
    id: "sp-medicines",
    name: "Expired or Unused Medicines",
    aliases: ["expired medicine", "old medicine", "unused medicine", "tablets", "capsules", "syrup", "prescription drugs", "pills"],
    stream: "special",
    shortExplanation:
      "Medicines must not be flushed or thrown in regular bins. They can contaminate water and soil.",
    disposalInstructions: [
      "Do NOT flush medicines down the toilet.",
      "Do NOT put in regular household bins.",
      "Return to a pharmacy — many pharmacies accept expired medicines.",
      "Look for medicine take-back programmes in your area.",
      "If no take-back is available: remove from packaging, mix with coffee grounds or cat litter, seal in a bag, and place in general waste (not recyclables) as a last resort.",
    ],
    preparationTips: [
      "Remove personal information from prescription labels before returning.",
      "Separate medicines from packaging: packaging may be recyclable (dry waste) while medicines need special disposal.",
    ],
    tags: ["hazardous", "medical", "medicine", "special-care"],
    source: "Hazardous Waste (Management, Handling and Transboundary Movement) Rules / WHO guidance",
  },
  {
    id: "sp-lightbulb-cfl",
    name: "CFL Bulbs and Fluorescent Tubes",
    aliases: ["cfl bulb", "fluorescent tube", "tube light", "energy saving bulb", "mercury bulb", "compact fluorescent"],
    stream: "special",
    shortExplanation:
      "CFL bulbs and fluorescent tubes contain mercury, a hazardous substance. They require special disposal.",
    disposalInstructions: [
      "Do NOT break — handle carefully to avoid mercury exposure.",
      "Place intact in a sealed bag or box.",
      "Return to authorised collection centres or your municipality's hazardous waste collection.",
      "Many municipalities in India have CFL collection points.",
      "Check the manufacturer's website for take-back options.",
    ],
    tags: ["hazardous", "mercury", "special-care", "bulb"],
    source: "Hazardous Waste Rules",
  },
  {
    id: "sp-led-bulb",
    name: "LED Bulbs",
    aliases: ["led bulb", "led light", "led lamp"],
    stream: "special",
    shortExplanation:
      "LED bulbs do not contain mercury but contain circuit boards and metals. They are e-waste and should be disposed at e-waste collection points.",
    disposalInstructions: [
      "Place in a sealed bag.",
      "Deposit at e-waste collection centres.",
      "Many electronics retailers accept old LED bulbs.",
    ],
    tags: ["ewaste", "special-care", "bulb"],
    source: "E-Waste (Management) Rules 2022",
  },
  {
    id: "sp-paint-chemicals",
    name: "Paints, Solvents and Household Chemicals",
    aliases: ["paint", "paint can", "solvent", "turpentine", "bleach", "chemical", "cleaning chemical", "drain cleaner", "pesticide", "insecticide"],
    stream: "special",
    shortExplanation:
      "Household chemicals and paints are hazardous. They must not go in general bins, drains, or the environment.",
    disposalInstructions: [
      "Do NOT pour down drains or in general bins.",
      "Contact your local municipal hazardous waste facility.",
      "Latex/water-based paint: allow to dry out completely (add cat litter or sand), then dispose in general waste as a last resort.",
      "Oil-based paint and solvents: must go to hazardous waste facility.",
      "Many municipalities hold hazardous household waste collection events.",
    ],
    tags: ["hazardous", "chemical", "paint", "special-care"],
    source: "Hazardous Waste Rules",
  },
  {
    id: "sp-sharps",
    name: "Syringes, Needles and Sharps",
    aliases: ["syringe", "needle", "insulin needle", "lancet", "sharps", "injection"],
    stream: "special",
    shortExplanation:
      "Used sharps are a biohazard. They need sharps containers and proper medical waste disposal.",
    disposalInstructions: [
      "Place immediately in a puncture-resistant sharps container (never a regular bin).",
      "Many pharmacies and hospitals accept sharps containers.",
      "Do NOT recap needles by hand.",
      "Contact your local health centre or municipal biomedical waste facility.",
    ],
    tags: ["hazardous", "medical", "sharps", "biohazard"],
    source: "Biomedical Waste Management Rules 2016",
  },

  // ─────────────────────────────────────────────────────────────
  // COMMON CONFUSING ITEMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "cf-thermocol",
    name: "Thermocol / Expanded Polystyrene (EPS)",
    aliases: ["thermocol", "styrofoam", "polystyrene", "foam packaging", "foam cup", "foam box"],
    stream: "dry",
    shortExplanation:
      "Thermocol is difficult to recycle in most Indian cities. It goes in dry waste, but check if your municipality has special collection.",
    disposalInstructions: [
      "Place in the blue (dry waste) bin.",
      "Do not burn thermocol — it releases toxic fumes.",
      "Some cities have thermocol recycling centres — check locally.",
      "Reuse packing thermocol where possible.",
    ],
    tags: ["plastic", "dry-waste", "difficult-to-recycle", "packaging"],
    source: "SWM Rules 2016",
  },
  {
    id: "cf-broken-crockery",
    name: "Broken Crockery and Ceramics",
    aliases: ["broken cup", "broken plate", "broken bowl", "crockery", "ceramics", "pottery", "broken mug"],
    stream: "dry",
    shortExplanation:
      "Broken crockery and ceramics cannot be recycled with glass. They go in dry waste with careful wrapping.",
    disposalInstructions: [
      "Wrap in several layers of newspaper.",
      "Label 'SHARP' or 'BROKEN GLASS' on the outside.",
      "Place in the dry waste bin.",
      "Do NOT put in glass recycling — ceramics contaminate glass recycling batches.",
    ],
    tags: ["dry-waste", "non-recyclable", "sharp"],
    source: "Common municipal guidance",
  },
  {
    id: "cf-writing-pen",
    name: "Pen and Plastic Writing Instruments",
    aliases: ["pen", "ballpoint pen", "ball pen", "ink pen", "marker pen", "gel pen", "refill pen", "pencil case pen"],
    stream: "dry",
    shortExplanation: "A used pen is a mixed-material item, usually made from plastic and/or metal with an ink cartridge. It is not wet, sanitary, or special-care waste in ordinary household use, but mixed-material pens are often not accepted in standard recycling.",
    disposalInstructions: [
      "If the pen still works, reuse it or pass it on.",
      "Separate a removable refill only if your local collection programme accepts it; do not dismantle a pressurised or leaking pen.",
      "If no take-back programme exists, follow your municipality's dry/residual waste guidance. Do not assume every plastic pen is recyclable."
    ],
    preparationTips: ["Keep leaking ink pens away from paper and fabric; wash ink from skin with soap and water."],
    tags: ["stationery", "writing", "plastic", "dry waste", "school supplies"],
    source: "General household waste guidance; local acceptance varies",
  },
  {
    id: "cf-spectacles",
    name: "Spectacles and Eyeglasses",
    aliases: ["spectacles", "spectacle", "eyeglasses", "eyeglass", "glasses", "reading glasses", "prescription glasses", "broken spectacles", "broken glasses", "sunglasses", "old glasses"],
    stream: "dry",
    shortExplanation: "Spectacles are mixed-material items made from glass or plastic lenses and metal or plastic frames. Reuse or repair is preferable; they are not wet or sanitary waste, and ordinary glass recycling usually does not accept lenses.",
    disposalInstructions: [
      "If usable, donate them through a reputable eyewear donation programme or ask an optician about reuse.",
      "If damaged, ask an optician or eyewear take-back programme whether frames or lenses can be recovered.",
      "If no take-back route exists, follow your municipality's dry/residual waste guidance. Do not put lenses in bottle-glass recycling."
    ],
    preparationTips: ["Keep broken lenses wrapped safely to prevent cuts; do not handle shards with bare hands."],
    tags: ["eyewear", "optical", "mixed material", "reuse", "dry waste"],
    source: "General reuse-first guidance; local collection options vary",
  },
  {
    id: "cf-towel-textile",
    name: "Towels and Household Textiles",
    aliases: ["towel", "towels", "bath towel", "hand towel", "face towel", "old towel", "cloth towel", "washcloth", "rag", "clean cloth", "used cloth"],
    stream: "dry",
    shortExplanation: "Towels and household textiles are best reused or donated when clean and usable. Worn textiles may be accepted by textile collection programmes, but local dry-waste rules vary.",
    disposalInstructions: [
      "If clean and usable, reuse as cleaning cloths or donate through an accepted textile collection programme.",
      "Keep textiles dry and separate from food waste.",
      "If unusable and no textile collection is available, check your municipality's residual/dry waste guidance. Do not assume all textiles are recyclable."
    ],
    preparationTips: ["Wash and dry before donation; do not donate contaminated or mouldy textiles."],
    tags: ["textile", "fabric", "cloth", "reuse", "dry waste"],
    source: "General reuse-first guidance; local collection options vary",
  },
  {
    id: "cf-footwear",
    name: "Shoes and Footwear",
    aliases: ["shoe", "shoes", "sneaker", "sneakers", "running shoe", "running shoes", "sports shoes", "old shoes", "worn shoes", "footwear", "boots", "sandals", "slippers"],
    stream: "dry",
    shortExplanation:
      "Footwear is not wet or sanitary waste. If it is still wearable, reuse or donation is usually the better option; worn-out footwear may need a local textile, rubber, or residual-waste route.",
    disposalInstructions: [
      "If clean and wearable, consider repair, reuse, or donation before disposal.",
      "If no reuse option is available, check your local municipality or a footwear/textile take-back programme for the accepted route.",
      "Do not put footwear in wet waste or assume it is accepted in standard recycling; local collection rules vary."
    ],
    preparationTips: [
      "Pair the shoes together and keep them dry if donating or using a take-back service."
    ],
    tags: ["footwear", "textile", "rubber", "reuse", "donation"],
    source: "General reuse-first guidance; verify local collection options",
  },
  {
    id: "cf-rubber-items",
    name: "Rubber Items",
    aliases: ["rubber band", "rubber glove", "rubber toy", "balloon", "rubber sole", "flip flop rubber"],
    stream: "dry",
    shortExplanation:
      "Most rubber items are not recyclable via standard channels. Place in dry waste. Specialised rubber recyclers exist but are not widely accessible.",
    disposalInstructions: [
      "Place in the blue (dry waste) bin.",
      "Tyres: contact your tyre dealer or municipality — they need separate disposal.",
    ],
    tags: ["dry-waste", "rubber", "non-recyclable"],
    source: "Common municipal guidance",
  },
  {
    id: "cf-coconut-shell",
    name: "Coconut Shell and Husk",
    aliases: ["coconut shell", "coconut husk", "coconut", "nariyal"],
    stream: "wet",
    shortExplanation:
      "Coconut shell and husk are organic and biodegradable, suitable for composting.",
    disposalInstructions: [
      "Place in the green (wet waste) bin.",
      "Coconut shells are excellent for composting and biochar production.",
      "Large shells may need to be broken into smaller pieces for efficient composting.",
    ],
    tags: ["organic", "kitchen", "compost", "biodegradable"],
    source: "SWM Rules 2016",
  },
  {
    id: "cf-aerosol",
    name: "Aerosol Cans",
    aliases: ["aerosol", "spray can", "deodorant can", "air freshener can", "hair spray", "insect spray can"],
    stream: "special",
    shortExplanation:
      "Aerosol cans may be under pressure and can contain flammable propellants. Handle with care — special-care disposal.",
    disposalInstructions: [
      "Ensure the can is completely empty.",
      "Do NOT puncture or crush the can.",
      "Empty aerosol cans can go in dry waste (metal recycling).",
      "Partially full aerosol cans: treat as hazardous waste and take to a special-care collection point.",
    ],
    conditionalRules: [
      {
        condition: "Whether the can is empty matters",
        question: "Is the aerosol can completely empty?",
        options: [
          {
            label: "Completely empty (no spray left)",
            stream: "dry",
            explanation: "Empty aerosol cans (metal) can go in dry waste / metal recycling.",
            disposalInstructions: [
              "Ensure completely empty.",
              "Do not puncture.",
              "Place in blue dry waste bin.",
            ],
          },
          {
            label: "Still has product / pressure inside",
            stream: "special",
            explanation: "Pressurised cans with remaining product are hazardous. Take to a special-care disposal point.",
            disposalInstructions: [
              "Do NOT put in regular bins.",
              "Store safely away from heat.",
              "Take to hazardous waste collection or contact municipality.",
            ],
          },
        ],
      },
    ],
    tags: ["metal", "hazardous", "pressurised", "special-care"],
    source: "Hazardous Waste Rules / Common municipal guidance",
  },
];

// ─────────────────────────────────────────────────────────────
// Search index — flat array of { keyword, itemId }
// ─────────────────────────────────────────────────────────────

type SearchEntry = { keyword: string; itemId: string };

let _searchIndex: SearchEntry[] | null = null;

export function getSearchIndex(): SearchEntry[] {
  if (_searchIndex) return _searchIndex;
  _searchIndex = [];
  for (const item of WASTE_KNOWLEDGE_BASE) {
    const terms = [item.name, ...item.aliases, ...item.tags, ...(item.examples ?? [])];
    for (const term of terms) {
      _searchIndex.push({ keyword: term.toLowerCase(), itemId: item.id });
    }
  }
  return _searchIndex;
}

export function findItemById(id: string): WasteItem | undefined {
  return WASTE_KNOWLEDGE_BASE.find((item) => item.id === id);
}
