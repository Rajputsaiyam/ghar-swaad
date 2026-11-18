const { SEED_MENU, SEED_SETTINGS } = require('../data/seedData');

// ============================================================================
// 1. COMPREHENSIVE GHARSWAAD RAG KNOWLEDGE CORPUS
// Strictly grounded in GharSwaad menu, flyers, pricing, policies, and kitchen specs
// ============================================================================
const KNOWLEDGE_CHUNKS = [
  // Core Brand & Cooking Philosophy
  {
    id: "about_gharswaad",
    category: "brand",
    title: "GharSwaad Philosophy & Food Standards",
    content:
      "GharSwaad prepares authentic, home-cooked food ('Fresh Ghar Ka Khana, Ab Aapke Office Tak!'). All food is 100% pure vegetarian, prepared every single morning with measured mild desi spices and minimal oil. We strictly use 100% whole-wheat tawa rotis (no maida), ZERO MSG (monosodium glutamate), and ZERO artificial food colorings or chemical preservatives. Packaged in sealed, food-grade containers.",
    keywords: [
      "about", "gharswaad", "philosophy", "pure veg", "vegetarian", "veg", "hygiene", "msg",
      "no msg", "oil", "spices", "quality", "clean", "fresh", "healthy", "taste", "who are you",
      "what is gharswaad", "maida", "atta", "wheat", "preservative"
    ],
  },

  // Combo Meals Comparison & Breakdown
  {
    id: "combo_thalis_overview",
    category: "menu_overview",
    title: "Combo Meals & Thalis Breakdown",
    content:
      "GharSwaad offers 4 complete full-plate combo thalis: \n" +
      "1. Basic Meal (₹70): 1 Sabzi (150g), Dal (150ml), 4 Roti, Rice (150g), Salad (onion, cucumber).\n" +
      "2. Classic Thali (₹90): 1 Sabzi (150g), Dal (150ml), 4 Roti, Rice (150g), Salad + Cooling Boondi Raita (100ml). (Our #1 bestseller for office lunch!)\n" +
      "3. Special Thali (₹110): Paneer or Seasonal Special Sabzi (150g), Dal (150ml), 4 Roti, Rice (150g), Salad + Raita (100ml).\n" +
      "4. Premium Thali (₹130): Generous Sabzi (200g), Dal (200ml), 4 Roti, Rice (200g), Salad, Raita (100ml), plus Crispy Urad Dal Papad (1 pc).",
    keywords: [
      "thali", "combo", "combos", "full plate", "basic meal", "classic thali", "special thali",
      "premium thali", "difference between thalis", "compare thalis", "what is in thali", "thali price", "thali menu"
    ],
  },

  // Roti Meals Breakdown
  {
    id: "roti_meals_overview",
    category: "menu_overview",
    title: "Roti Meals (1 Sabzi / Dal + Soft Rotis)",
    content:
      "Roti Meals are simple, light everyday meals with your choice of 1 freshly prepared sabzi or dal and 100% whole-wheat phulkas: \n" +
      "• Dal + 2 Roti: ₹40 | Dal + 4 Roti: ₹60 (Yellow tempered dal)\n" +
      "• 1 Sabzi + 2 Roti: ₹45 | 1 Sabzi + 4 Roti: ₹65 (Seasonal homestyle sabzi)\n" +
      "• Mix Veg + 2 Roti: ₹50 | Mix Veg + 4 Roti: ₹70 (Garden fresh veggies)\n" +
      "• Chole + 2 Roti: ₹55 | Chole + 4 Roti: ₹75 (Punjabi spiced chole)\n" +
      "• Rajma + 2 Roti: ₹55 | Rajma + 4 Roti: ₹75 (Slow-cooked homestyle rajma)\n" +
      "• Paneer Sabzi + 2 Roti: ₹70 | Paneer Sabzi + 4 Roti: ₹90 (Rich cottage cheese curry)",
    keywords: [
      "roti meals", "roti meal", "dal roti", "sabzi roti", "chole roti", "rajma roti",
      "paneer roti", "phulka", "tawa roti", "2 roti", "4 roti", "mix veg"
    ],
  },

  // Rice Meals Breakdown
  {
    id: "rice_meals_overview",
    category: "menu_overview",
    title: "Rice Meals (Half Plate & Full Plate Options)",
    content:
      "Wholesome rice dishes paired with comforting curries, available in both Half and Full portions:\n" +
      "• Rajma Rice: Full ₹60 (250g Rice + 200g Rajma) | Half ₹40\n" +
      "• Chole Rice: Full ₹60 (250g Rice + 200g Chole) | Half ₹40\n" +
      "• Kadhi Rice: Full ₹60 (250g Rice + 200g Pakoda Kadhi) | Half ₹40\n" +
      "• Dal Rice: Full ₹55 (250g Rice + 200ml Desi Ghee Dal) | Half ₹35\n" +
      "• Jeera Rice + Sabzi: Full ₹70 (250g Jeera Rice + 200g Sabzi) | Half ₹45\n" +
      "• Veg Pulao + Raita: Full ₹70 (250g Veg Pulao + 100ml Raita) | Half ₹45\n" +
      "• Paneer Pulao + Raita: Full ₹80 (250g Paneer Pulao + 100ml Raita) | Half ₹50",
    keywords: [
      "rice meals", "rice", "chawal", "rajma rice", "rajma chawal", "chole rice", "chole chawal",
      "kadhi rice", "kadhi chawal", "dal rice", "dal chawal", "pulao", "jeera rice", "paneer pulao",
      "half plate", "half portion"
    ],
  },

  // Snacks & Breakfast
  {
    id: "snacks_overview",
    category: "menu_overview",
    title: "Fresh Snacks & Evening Bites",
    content:
      "Freshly prepared snacks made on order:\n" +
      "• Aloo Paratha + Curd (100ml): 1 pc for ₹50 | 2 pcs for ₹70\n" +
      "• Paneer Paratha + Curd (100ml): 1 pc for ₹60 | 2 pcs for ₹90\n" +
      "• Veg Maggi: ₹40 (hot vegetable masala maggi with sweet corn, peas & carrots)\n" +
      "• Poha: ₹40 (Indori style tempered flattened rice with roasted peanuts & curry leaves)\n" +
      "• Upma: ₹40 (traditional roasted suji semolina upma with garden vegetables)",
    keywords: [
      "snacks", "breakfast", "paratha", "aloo paratha", "paneer paratha", "curd",
      "maggi", "veg maggi", "poha", "upma", "evening snacks", "chai nashta"
    ],
  },

  // Extras & Add-ons
  {
    id: "extras_overview",
    category: "menu_overview",
    title: "Extras & Add-On Sides",
    content:
      "Affordable add-ons to complete your meal:\n" +
      "• Extra Roti: ₹10 (1 fresh 100% whole-wheat tawa roti)\n" +
      "• Extra Rice (plain steamed): ₹15 (150g portion)\n" +
      "• Raita (small bowl): ₹15 (100ml seasoned boondi / cucumber curd)\n" +
      "• Green Salad (small bowl): ₹15 (fresh cucumber, onion, tomato, lemon slice)\n" +
      "• Papad: ₹10 (1 pc crispy roasted urad dal papad)\n" +
      "• Achar (small portion): ₹10 (30g homestyle mango/mixed pickle)",
    keywords: [
      "extras", "add-on", "side", "extra roti", "extra rice", "raita", "salad",
      "papad", "achar", "pickle", "dahi", "plain rice"
    ],
  },

  // Weekly & Monthly Subscriptions
  {
    id: "subscription_plans",
    category: "subscriptions",
    title: "Weekly & Monthly Office Lunch Passes",
    content:
      "GharSwaad provides hassle-free lunch subscriptions for office workers and students:\n" +
      "1. Weekly Lunch Plan (5 days): ₹320 total (cost comes to just ₹64/meal!). 1 full meal per day (Mon–Fri fixed rotating healthy menu) delivered hot by 12:45 PM.\n" +
      "2. Monthly Lunch Plan (22 days): ₹1,400 total (cost comes to just ~₹63.6/meal!). 1 full meal per working day (Mon–Fri) delivered to your desk.\n" +
      "• Flexibility: You can pause or skip any day with 24 hours prior notice on WhatsApp!\n" +
      "• Corporate / Office Teams: Discounts available for groups of 10+ employees.",
    keywords: [
      "weekly", "monthly", "plan", "subscription", "tiffin", "daily lunch", "pass",
      "monthly plan", "weekly plan", "tiffin service", "daily meal", "corporate",
      "office catering", "team lunch", "bulk", "discount", "pause plan"
    ],
  },

  // Central Kitchen Location, Delivery & Timings
  {
    id: "delivery_policy",
    category: "delivery",
    title: "Delivery Radius, Timings & Address",
    content:
      "Central Kitchen Address: Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018.\n" +
      "• Delivery Radius: 2 to 4 km covering Khayala, Vishnu Garden, Tilak Nagar, Subhash Nagar, Chand Nagar, Tagore Garden & surrounding workplaces.\n" +
      "• Delivery Fee: Flat ₹20 per order. FREE DELIVERY on orders of ₹300 and above!\n" +
      "• Timings: Open Monday to Saturday, 8:00 AM to 9:00 PM. Daily lunch is dispatched hot for 12:45 PM delivery.",
    keywords: [
      "delivery", "address", "location", "where are you", "khayala", "vishnu garden",
      "ravi nagar", "delhi", "110018", "radius", "how far", "fee", "free delivery",
      "charges", "timing", "hours", "when deliver", "12:45", "lunch time"
    ],
  },

  // Customer Care & Support Hotlines
  {
    id: "contact_support",
    category: "support",
    title: "Customer Support & Kitchen Hotline",
    content:
      "Get in touch with GharSwaad Kitchen Management:\n" +
      "• Phone Hotline: +91 93544 29850\n" +
      "• WhatsApp Care: +91 93544 29850 (Tap the WhatsApp button in chat for instant reply!)\n" +
      "• Official Email: saiyamrajput71@gmail.com\n" +
      "• Central Kitchen: Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018.\n" +
      "We respond promptly to order customizations, address changes, and corporate inquiries.",
    keywords: [
      "contact", "phone", "mobile", "number", "call", "whatsapp", "support", "help",
      "care", "email", "talk to human", "speak", "person", "complaint", "reach",
      "owner", "kitchen support", "saiyam"
    ],
  },

  // Payment Methods
  {
    id: "payment_options",
    category: "payment",
    title: "Payment Methods (COD & UPI)",
    content:
      "We offer two easy payment options at checkout:\n" +
      "1. Cash on Delivery (COD): Pay directly with cash when the delivery person hands you your hot meal.\n" +
      "2. Online UPI: Pay securely via Google Pay, PhonePe, Paytm, or BHIM to UPI ID 9354429850@upi or scan the delivery QR code.",
    keywords: [
      "payment", "pay", "upi", "cash on delivery", "cod", "online payment",
      "google pay", "gpay", "phonepe", "paytm", "bhim", "qr code", "how to pay"
    ],
  },

  // How to Place Order & Track Order
  {
    id: "order_tracking_howto",
    category: "orders",
    title: "How to Order & Track Delivery",
    content:
      "Ordering is super simple:\n" +
      "1. Browse our menu and click 'Add to Cart' (or ask this assistant to add items for you).\n" +
      "2. Go to your Cart, enter your Name, Phone Number, Delivery Address, and select COD or UPI.\n" +
      "3. Once placed, you receive an Order ID (e.g. GS-1024).\n" +
      "4. Track live progress anytime on the 'Track Order' page by entering your Order ID or 10-digit mobile number!\n" +
      "• Cancellation policy: You can modify or cancel an order within 15 minutes of placing it by calling/WhatsApping +91 93544 29850.",
    keywords: [
      "how to order", "order", "track", "tracking", "status", "where is my food",
      "cancel", "cancellation", "refund", "modify order", "cart", "checkout"
    ],
  },

  // Dietary Restrictions & Jain Food Requests
  {
    id: "dietary_customization",
    category: "dietary",
    title: "Dietary Customs (100% Pure Veg, Low Spice, No Onion-Garlic)",
    content:
      "GharSwaad is a 100% Pure Vegetarian kitchen. We do not use eggs, meat, or seafood.\n" +
      "• Spice Level: All meals are cooked in balanced, homestyle spices suitable for everyday eating without acidity.\n" +
      "• Jain / No Onion-Garlic requests: Available for pre-booked lunch orders or meal plan subscribers! Message us on WhatsApp (+91 93544 29850) before 10:00 AM.",
    keywords: [
      "jain", "no onion", "no garlic", "spicy", "less spice", "diet", "healthy",
      "pure veg", "egg", "non veg", "acidity", "homestyle"
    ],
  },

  // All 38 Individual Menu Items
  ...SEED_MENU.map((item) => ({
    id: `menu_${item.id}`,
    category: "menu",
    title: `${item.name} (${item.category})`,
    content: `${item.name} - ₹${item.price}${item.halfPrice ? ` (Half portion: ₹${item.halfPrice})` : ""}. Category: ${item.category}. Portion Details: ${item.portion}. Description: ${item.description}. Ingredients: ${item.ingredients.join(", ")}.`,
    keywords: [
      ...item.name.toLowerCase().split(/\s+/),
      item.category.toLowerCase(),
      ...item.ingredients.map((i) => i.toLowerCase().replace(/[^a-z0-9]/g, "")),
      "price",
      "cost",
      "rate",
      "portion",
      "ingredients",
    ],
    item,
  })),
];

// ============================================================================
// 2. STRICT DOMAIN RELEVANCE & GUARDRAIL CHECKER
// Detects if the query belongs to GharSwaad vs. unrelated topics (politics,
// general knowledge, code, competitor foods, homework, finance, etc.)
// ============================================================================
const OUT_OF_SCOPE_FOODS = [
  "pizza", "pizzas", "burger", "burgers", "momos", "momo", "noodles", "noodle", "chowmein", "pasta",
  "sandwich", "sandwiches", "chicken", "mutton", "fish", "egg", "eggs", "biryani",
  "pork", "beef", "sushi", "shawarma", "beer", "wine", "alcohol", "liquor", "cocktail",
  "kfc", "mcdonalds", "mcdonald", "dominos", "subway", "ice cream", "cake", "pastry",
  "cold drink", "pepsi", "coca cola", "coke", "fries", "french fries", "non veg", "non-veg"
];

const OUT_OF_SCOPE_PATTERNS = [
  // Tech & coding
  /\b(python|javascript|java|c\+\+|coding|code|github|bug|software|app dev|html|css|react|node|developer|program|script|database|sql)\b/i,
  // Politics & current events
  /\b(prime minister|president|election|politics|modi|trump|biden|congress|bjp|parliament|government|war|military|russia|ukraine)\b/i,
  // Sports
  /\b(cricket|ipl|match|score|football|fifa|world cup|messi|ronaldo|virat|dhoni|tennis|badminton)\b/i,
  // Finance & unrelated commerce (stocks, shares, crypto, gold, petrol, commodities)
  /\b(stock|stocks|share|shares|equity|nifty|sensex|bitcoin|crypto|cryptocurrency|ethereum|gold|silver|petrol|diesel|forex|mutual fund|market price|ipo)\b/i,
  // Entertainment & media
  /\b(movie|film|actor|actress|bollywood|hollywood|cinema|song|singer|music album|netflix|youtube channel)\b/i,
  // Academic / general knowledge / trivia
  /\b(capital of|who invented|who discovered|homework|essay on|math equation|solve this|translate to|poem about|write a story|tell a joke|joke|mount everest|tallest|speed of light)\b/i,
  // Unrelated goods & services
  /\b(car|cars|bike|bikes|iphone|android|laptop|samsung|apple|tesla|clothing|shoes|furniture|real estate|flat for rent|flight|train ticket|hotel)\b/i,
];

// Specific entities that belong to GharSwaad domain
const GHARSWAAD_CORE_ENTITIES = [
  // Menu items
  "basic meal", "classic thali", "special thali", "premium thali", "thali", "combo",
  "rajma", "chole", "kadhi", "dal", "mix veg", "paneer", "sabzi", "roti", "phulka",
  "rice", "chawal", "pulao", "jeera rice", "paratha", "aloo paratha", "paneer paratha",
  "poha", "upma", "maggi", "raita", "salad", "papad", "achar", "extra roti", "extra rice",
  // Services & Operations
  "tiffin", "subscription", "weekly", "monthly", "lunch plan", "office lunch", "desk drop",
  "pass", "corporate", "catering", "bulk", "discount",
  // Delivery & Local Neighborhoods (2-4 km radius)
  "khayala", "vishnu garden", "vishnu", "ravi nagar", "gharswaad", "ghar swaad", "110018",
  "tagore garden", "tagore", "tilak nagar", "tilak", "subhash nagar", "subhash",
  "chand nagar", "janakpuri", "rajouri garden", "delhi",
  "delivery", "deliver", "delivering", "radius", "charges", "kitchen", "support", "hotline", "whatsapp",
  // Food Standards & Dietary
  "pure veg", "hygiene", "msg", "no msg", "whole wheat", "atta", "spicy", "spice", "spices",
  "mirch", "masala", "mild", "chilli", "acidity", "jain", "onion", "garlic",
  // Order Lifecycle
  "tracking", "track order", "track", "cancel", "cancellation", "status"
];

function checkDomainRelevance(query) {
  const q = query.toLowerCase().trim();

  // 1. Prohibited / unserved foods check (fast food, non-veg)
  for (const food of OUT_OF_SCOPE_FOODS) {
    const regex = new RegExp(`\\b${food.replace("-", "[ -]?")}\\b`, "i");
    if (regex.test(q)) {
      return {
        isRelevant: false,
        reason: "UNSERVED_FOOD",
        keyword: food,
      };
    }
  }

  // 2. Out-of-scope domain pattern matching (tech, finance, politics, sports, commodities, etc.)
  for (const pattern of OUT_OF_SCOPE_PATTERNS) {
    if (pattern.test(q)) {
      return {
        isRelevant: false,
        reason: "OFF_TOPIC",
        keyword: q.match(pattern)?.[0] || "unrelated topic",
      };
    }
  }

  // 3. Greetings are always allowed
  const greetings = [
    "hi", "hello", "hey", "namaste", "pranam", "good morning",
    "good afternoon", "good evening", "ram ram", "sat sri akaal", "radhe radhe"
  ];
  if (greetings.some((g) => q === g || q.startsWith(g + " ") || q.startsWith(g + "!"))) {
    return { isRelevant: true, reason: "GREETING" };
  }

  // 4. Check presence of core GharSwaad entities
  const hasCoreEntity = GHARSWAAD_CORE_ENTITIES.some((entity) => {
    const regex = new RegExp(`\\b${entity}\\b`, "i");
    return regex.test(q) || q.includes(entity);
  });

  if (hasCoreEntity) {
    return { isRelevant: true, reason: "CORE_ENTITY_MATCH" };
  }

  // 5. General food / kitchen intent keywords
  const generalFoodIntents = [
    "khana", "food", "lunch", "dinner", "breakfast", "menu", "order", "cart",
    "half plate", "full plate", "tiffin service", "veg food", "deliver", "delivery", "delivering"
  ];
  const hasFoodIntent = generalFoodIntents.some((term) => {
    const regex = new RegExp(`\\b${term}\\b`, "i");
    return regex.test(q);
  });

  if (hasFoodIntent) {
    return { isRelevant: true, reason: "FOOD_INTENT_MATCH" };
  }

  // 6. Generic price / cost questions: strictly require food/meal/menu context
  // (e.g. "what are your prices?", "how much is the food?", "cheapest meal")
  if (/\b(price|prices|rate|rates|cost|how much|cheapest|budget)\b/i.test(q)) {
    if (/\b(meal|meals|item|items|food|thali|dish|dishes|tiffin|lunch|your|here|menu|everything|starter|all)\b/i.test(q) || q === "price" || q === "prices" || q === "rates" || q === "menu price") {
      return { isRelevant: true, reason: "PRICE_INQUIRY" };
    }
  }

  // If nothing matched GharSwaad, reject as off-topic to strictly protect relevance
  return { isRelevant: false, reason: "UNKNOWN_TOPIC" };
}

// Helper stemmer for English & Hinglish food plurals
function stemWord(w) {
  if (!w || w.length <= 3) return w;
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.endsWith("es") && !w.endsWith("des")) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

// ============================================================================
// 3. KNOWLEDGE RETRIEVAL (TF-IDF & Semantic Intent Scoring)
// ============================================================================
function retrieveKnowledge(query, topK = 4) {
  const clean = query.toLowerCase().trim();
  const rawTokens = clean.split(/[\s,?.!+()/-]+/).filter((w) => w.length > 1);
  const stemmedTokens = rawTokens.map(stemWord);
  const allTokens = Array.from(new Set([...rawTokens, ...stemmedTokens]));

  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;

    // Check specific menu item multi-word overlap
    if (chunk.category === "menu" && chunk.item) {
      const itemNameClean = chunk.item.name.toLowerCase();
      // Extract main words like "paneer", "paratha", "rajma", "rice"
      const itemWords = itemNameClean
        .replace(/\(.*?\)/g, "")
        .replace(/(\+ curd|\+ raita|\+ salad|\+ sabzi)/g, "")
        .split(/[\s,?.!+()/-]+/)
        .filter((w) => w.length > 2 && w !== "and" && w !== "the")
        .map(stemWord);

      if (itemWords.length > 0) {
        const matchesCount = itemWords.filter((iw) =>
          stemmedTokens.includes(iw) || clean.includes(iw)
        ).length;

        if (matchesCount === itemWords.length) {
          // Complete multi-word match (e.g. "paneer paratha" matched both "paneer" and "paratha")
          score += 10.0;
        } else if (matchesCount > 0) {
          score += matchesCount * 2.0;
        }
      }

      // Exact substring of item name in clean query
      if (clean.includes(itemNameClean)) {
        score += 8.0;
      }
    }

    // Exact title match boost
    if (clean.includes(chunk.title.toLowerCase())) {
      score += 5.0;
    }

    // Keyword hits
    for (const token of allTokens) {
      if (chunk.keywords.some((kw) => kw === token || kw.includes(token) || token.includes(kw))) {
        score += 1.4;
      }
      if (chunk.content.toLowerCase().includes(token)) {
        score += 0.8;
      }
    }

    // Category boosts
    if (allTokens.includes("thali") && (chunk.id === "combo_thalis_overview" || chunk.title.toLowerCase().includes("thali"))) score += 3.0;
    if (allTokens.includes("roti") && (chunk.id === "roti_meals_overview" || chunk.category === "menu")) score += 2.0;
    if (allTokens.includes("rice") && (chunk.id === "rice_meals_overview" || chunk.category === "menu")) score += 2.0;
    if ((allTokens.includes("plan") || allTokens.includes("month") || allTokens.includes("week") || allTokens.includes("tiffin")) && chunk.id === "subscription_plans") score += 4.0;
    if ((allTokens.includes("delivery") || allTokens.includes("khayala") || allTokens.includes("vishnu") || allTokens.includes("address")) && chunk.id === "delivery_policy") score += 4.0;
    if ((allTokens.includes("contact") || allTokens.includes("call") || allTokens.includes("whatsapp") || allTokens.includes("support")) && chunk.id === "contact_support") score += 4.5;
    if ((allTokens.includes("track") || allTokens.includes("status") || allTokens.includes("cancel")) && chunk.id === "order_tracking_howto") score += 4.0;
    if ((allTokens.includes("msg") || allTokens.includes("hygiene") || allTokens.includes("pure")) && chunk.id === "about_gharswaad") score += 4.0;

    const normalizedScore = Math.min(1.0, Math.round((score / 8.0) * 100) / 100);
    return { ...chunk, relevanceScore: normalizedScore };
  });

  return scored
    .filter((c) => c.relevanceScore > 0.15)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, topK);
}

// ============================================================================
// 4. INTELLIGENT RAG RESPONSE ENGINE WITH STRICT GUARDRAILS
// ============================================================================
function processChatMessage(userMessage) {
  const raw = String(userMessage || "").trim();
  const q = raw.toLowerCase();

  // STEP 1: Guardrail Check
  const domainCheck = checkDomainRelevance(raw);

  // If user asks about fast food or non-vegetarian food
  if (!domainCheck.isRelevant && domainCheck.reason === "UNSERVED_FOOD") {
    return {
      reply: `GharSwaad is exclusively a **100% Pure Vegetarian homestyle kitchen**. 
We do **not** serve fast food (like ${domainCheck.keyword}), non-vegetarian dishes, or processed junk.

Instead, we prepare fresh, healthy, everyday **Ghar Ka Khana** with 100% whole-wheat tawa rotis and zero MSG!

Can I tempt you with our wholesome options?
• **Classic Thali (₹90)**: 1 Sabzi, Dal, 4 Rotis, Rice & Raita
• **Rajma Rice (₹60)**: Punjabi homestyle comfort
• **Paneer Paratha + Curd (₹60)**: Fresh & filling`,
      retrievedSources: [
        {
          id: "about_gharswaad",
          title: "GharSwaad Food Standards (100% Pure Vegetarian)",
          category: "brand",
          excerpt: "GharSwaad prepares authentic, home-cooked food. All food is 100% pure vegetarian, zero MSG, and made with 100% whole-wheat tawa rotis.",
          relevanceScore: 0.95,
        },
      ],
      actionSuggested: null,
      quickReplies: [
        "🍱 View Combo Thalis",
        "🍛 Rajma Rice (₹60)",
        "🫓 Paneer Paratha (₹60)",
        "📅 Weekly Lunch Plan (₹320)",
      ],
    };
  }

  // If user asks completely off-topic questions (coding, politics, general knowledge, weather, etc.)
  if (!domainCheck.isRelevant && (domainCheck.reason === "OFF_TOPIC" || domainCheck.reason === "UNKNOWN_TOPIC")) {
    return {
      reply: `Namaste! 🙏 I am the dedicated **GharSwaad Food & Support Assistant**.

I am programmed to only assist with **GharSwaad homemade food services**, including:
• Our daily homestyle lunch menu and pricing
• Thalis, Roti meals, Rice bowls & Evening snacks
• Weekly (₹320) & Monthly (₹1,400) office lunch passes
• Delivery coverage in **Khayala, Vishnu Garden** & nearby areas
• Placing orders, tracking active orders, or reaching Kitchen Support (+91 93544 29850)

How can I help you with your homemade food order today?`,
      retrievedSources: [],
      actionSuggested: null,
      quickReplies: [
        "🍱 Browse Full Menu",
        "🍛 Rajma Chawal (₹60)",
        "📅 Weekly Plan (₹320)",
        "📞 Kitchen Hotline",
      ],
    };
  }

  // STEP 2: Retrieve relevant knowledge chunks
  const retrieved = retrieveKnowledge(raw, 4);

  let reply = "";
  let actionSuggested = null;
  let quickReplies = [];

  // ==========================================================================
  // ==========================================================================
  // INTENT A: Natural Greetings
  // ==========================================================================
  const greetingsList = ["hi", "hello", "hey", "namaste", "pranam", "good morning", "good afternoon", "good evening", "ram ram", "sat sri akaal", "radhe radhe"];
  const isGreetingOnly = greetingsList.some((g) => q === g || q === `${g}!` || q === `${g}.`);

  if (isGreetingOnly) {
    reply = `Namaste! 🙏 Welcome to **GharSwaad** — *Fresh Ghar Ka Khana, Ab Aapke Office Tak!*

Everything is prepared fresh this morning with 100% whole-wheat tawa rotis and zero MSG.
• **Lunch Delivery**: Dispatched hot for 12:45 PM desk arrival.
• **Popular Choices**: Classic Thali (₹90), Rajma Rice (₹60), Dal + 2 Roti (₹40).
• **Office Lunch Passes**: Weekly Plan for ₹320 (5 days) or Monthly Plan for ₹1,400 (22 days).

What would you like to order today?`;

    quickReplies = [
      "🍱 Check Thalis",
      "🍛 Rajma Rice (₹60)",
      "📅 Weekly Lunch Plan (₹320)",
      "📞 Kitchen Support",
    ];
  }

  // ==========================================================================
  // INTENT B: Order Cancellation, Tracking & Status
  // ==========================================================================
  else if (
    q.includes("cancel") ||
    q.includes("cancellation") ||
    q.includes("status") ||
    q.includes("where is my order") ||
    q.includes("track") ||
    q.includes("late")
  ) {
    reply = `You can easily track your live delivery or request urgent order changes:

1. Click **Track Order** in the top navigation bar.
2. Enter your **Order ID** (e.g. GS-1024) or your **10-digit mobile number** to view live dispatch stages (*Pending ➔ Confirmed ➔ Preparing ➔ Out for Delivery ➔ Delivered*).

• **Order Cancellation**: You can cancel an order within **15 minutes** of placing it by calling Kitchen Support directly at **+91 93544 29850**. Once our cooks start preparing your fresh meal, orders cannot be cancelled.`;

    actionSuggested = {
      type: "WHATSAPP_SUPPORT",
      phone: "9354429850",
      label: "Call / WhatsApp Kitchen for Urgent Status (+91 93544 29850)",
    };

    quickReplies = [
      "📞 Call Kitchen Hotline",
      "🍱 View Full Menu",
    ];
  }

  // ==========================================================================
  // INTENT C: Dietary Customs (Spiciness, Less Spice, Jain, No Onion-Garlic)
  // ==========================================================================
  else if (
    q.includes("spic") ||
    q.includes("mirch") ||
    q.includes("masala") ||
    q.includes("mild") ||
    q.includes("chilli") ||
    q.includes("acidity") ||
    q.includes("jain") ||
    q.includes("onion") ||
    q.includes("garlic")
  ) {
    reply = `At GharSwaad, food safety, balanced health, and digestive comfort are our highest priorities:

🌶️ **Balanced Mild Spicing**: All dishes are cooked in balanced, light homestyle spices. We never make food overly oily or heavily spiced, so you feel energetic and comfortable throughout your working hours without acidity.
🧄 **Jain & Custom Requests**: Need food with **NO onion & NO garlic**? Pre-book your lunch order or subscribe to our meal plan and notify us on WhatsApp (+91 93544 29850) before 10:00 AM!
🌿 **100% Pure Vegetarian**: Prepared strictly in a sanitized vegetarian kitchen with whole-wheat flour.`;

    actionSuggested = {
      type: "WHATSAPP_SUPPORT",
      phone: "9354429850",
      label: "Request Low Spice / Jain Food on WhatsApp",
    };

    quickReplies = [
      "🍱 View Today's Thalis",
      "🍛 Rajma Rice (₹60)",
      "📅 Weekly Lunch Plan (₹320)",
    ];
  }

  // ==========================================================================
  // INTENT D: Contact, Phone Hotline & WhatsApp Customer Care
  // ==========================================================================
  else if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("whatsapp") ||
    q.includes("human") ||
    q.includes("support") ||
    q.includes("care") ||
    q.includes("complaint") ||
    q.includes("help") ||
    q.includes("speak") ||
    q.includes("talk")
  ) {
    reply = `You can connect directly with our Kitchen Operations & Customer Care team:

📞 **Phone Hotline**: +91 93544 29850
💬 **WhatsApp Support**: +91 93544 29850 (Tap the green button below for instant chat)
📧 **Official Email**: saiyamrajput71@gmail.com
📍 **Kitchen Address**: Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018
⏰ **Support Hours**: Monday to Saturday, 8:00 AM – 9:00 PM

We are happy to assist with urgent delivery updates, dietary preferences, or corporate catering!`;

    actionSuggested = {
      type: "WHATSAPP_SUPPORT",
      phone: "9354429850",
      label: "Chat with Kitchen Support on WhatsApp (9354429850)",
    };

    quickReplies = [
      "🥘 View Today's Menu",
      "🚚 Delivery Coverage Area",
      "📅 Weekly / Monthly Plans",
    ];
  }

  // ==========================================================================
  // INTENT E: Subscriptions / Weekly & Monthly Lunch Plans
  // ==========================================================================
  else if (
    q.includes("plan") ||
    q.includes("subscription") ||
    q.includes("month") ||
    q.includes("week") ||
    q.includes("tiffin") ||
    q.includes("pass")
  ) {
    reply = `Here are our popular daily lunch tiffin subscriptions:

1. **Weekly Lunch Plan (5 days - Mon to Fri)**:
   • **Total Cost**: **₹320** (Just ₹64 per fresh wholesome meal!)
   • 1 full meal per day with fresh rotating sabzi, dal, 4 whole-wheat rotis, rice & salad.
   • Delivered hot to your workplace by 12:45 PM.

2. **Monthly Lunch Plan (22 days - Mon to Fri)**:
   • **Total Cost**: **₹1,400** (Just ~₹63.6 per meal — maximum savings!)
   • Complete daily office lunch pass with guaranteed priority delivery.

3. **Flexibility & Pausing**:
   • Going on leave? You can pause your plan anytime with 24 hours notice on WhatsApp!
   • Office Teams of 10+ people get customized scheduled deliveries and volume discounts.`;

    actionSuggested = {
      type: "WHATSAPP_SUPPORT",
      phone: "9354429850",
      label: "Book Weekly / Monthly Plan on WhatsApp",
    };

    quickReplies = [
      "🍱 What comes in the Thali?",
      "🚚 Delivery to Vishnu Garden?",
      "📞 Call Kitchen (+91 93544 29850)",
    ];
  }

  // ==========================================================================
  // INTENT F: Delivery Radius, Timings, Location & Charges
  // ==========================================================================
  else if (
    q.includes("deliver") ||
    q.includes("radius") ||
    q.includes("area") ||
    q.includes("distance") ||
    q.includes("khayala") ||
    q.includes("vishnu garden") ||
    q.includes("vishnu") ||
    q.includes("ravi nagar") ||
    q.includes("tagore") ||
    q.includes("tilak") ||
    q.includes("subhash") ||
    q.includes("chand nagar") ||
    q.includes("janakpuri") ||
    q.includes("where") ||
    q.includes("location") ||
    q.includes("address") ||
    q.includes("timing") ||
    q.includes("time") ||
    q.includes("charge") ||
    q.includes("fee")
  ) {
    reply = `Here are all the details on GharSwaad delivery operations:

📍 **Central Kitchen**: Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018
🛵 **Delivery Radius**: We deliver within a **2 to 4 km** radius covering Khayala, Vishnu Garden, Tilak Nagar, Subhash Nagar, Chand Nagar, and Tagore Garden workplaces.
⏰ **Operating Hours**: Monday to Saturday, 8:00 AM to 9:00 PM.
🍱 **Lunch Delivery Timing**: Dispatched fresh and hot for **12:45 PM** delivery to your office/home.
💵 **Delivery Charges**:
• Flat **₹20** delivery charge on normal orders.
• **FREE Delivery** on orders of ₹300 and above!`;

    quickReplies = [
      "🍱 Order Classic Thali (₹90)",
      "🍛 Order Rajma Rice (₹60)",
      "📞 Kitchen Hotline",
      "📍 WhatsApp Support",
    ];
  }

  // ==========================================================================
  // INTENT G: Direct Ordering / Add to Cart (e.g. "add rajma rice", "order 2 classic thali")
  // ==========================================================================
  else if (
    q.includes("order") ||
    q.includes("add") ||
    q.includes("buy") ||
    q.includes("want") ||
    q.includes("chahiye") ||
    q.includes("give me") ||
    q.includes("pack")
  ) {
    // Check if user specifically ordered plain/extra rotis or rice
    let it = null;
    const isExtraRotiQuery = (q.includes("extra roti") || q.includes("plain roti") || (/\b\d*\s*rotis?\b/.test(q) && !q.includes("dal") && !q.includes("sabzi") && !q.includes("chole") && !q.includes("rajma") && !q.includes("paneer") && !q.includes("mix veg")));
    const isExtraRiceQuery = (q.includes("extra rice") || (q.includes("plain rice") && !q.includes("jeera")));

    if (isExtraRotiQuery) {
      it = SEED_MENU.find((m) => m.name === "Extra Roti");
    } else if (isExtraRiceQuery) {
      it = SEED_MENU.find((m) => m.name === "Extra Rice (plain)");
    } else {
      const matchedMenuItem = retrieved.find((c) => c.category === "menu" && c.item);
      if (matchedMenuItem) it = matchedMenuItem.item;
    }

    if (it) {
      const isHalf = q.includes("half") && it.halfPrice;

      // Extract quantity from text (e.g. "4 rotis", "2 thalis", "3 parathas")
      let qty = 1;
      const qtyMatch = q.match(/\b([1-9]|10)\b/);
      if (qtyMatch) {
        qty = parseInt(qtyMatch[1], 10);
      } else if (q.includes("two") || q.includes("do ")) qty = 2;
      else if (q.includes("three") || q.includes("teen ")) qty = 3;
      else if (q.includes("four") || q.includes("char ")) qty = 4;

      const unitPrice = isHalf ? it.halfPrice : it.price;
      const totalPrice = unitPrice * qty;

      reply = `Great choice! I found **${it.name}**${isHalf ? " (Half Plate)" : ""}.
• **Price**: ₹${unitPrice}${qty > 1 ? ` × ${qty} = ₹${totalPrice}` : ""}
• **Portion**: ${it.portion}
• **Details**: ${it.description}

Click below to add directly to your cart, or continue exploring!`;

      actionSuggested = {
        type: "ADD_TO_CART",
        item: it,
        variant: isHalf ? "Half" : (it.halfPrice ? "Full" : undefined),
        qty,
        price: unitPrice,
        label: `Add ${qty > 1 ? `${qty}× ` : ""}${it.name}${isHalf ? " (Half)" : ""} (₹${totalPrice}) to Cart`,
      };

      quickReplies = [
        "🛒 View Cart & Checkout",
        "🥤 Add Green Salad (₹15)",
        "🫓 Add Extra Roti (₹10)",
        "🍱 View Other Thalis",
      ];
    } else {
      reply = `I would love to help you order! Here are our most popular categories:
• **Full Combo Thalis**: Basic Meal (₹70), Classic Thali (₹90), Special Thali (₹110), Premium Thali (₹130)
• **Rice Meals**: Rajma Chawal (₹60), Chole Chawal (₹60), Kadhi Chawal (₹60), Dal Rice (₹55)
• **Roti Meals**: Dal + 2 Roti (₹40), Sabzi + 2 Roti (₹45), Paneer + 2 Roti (₹70)
• **Snacks**: Aloo Paratha with Curd (₹50), Paneer Paratha (₹60), Poha (₹40)

Which dish would you like me to add to your cart?`;

      quickReplies = [
        "🍱 Add Classic Thali (₹90)",
        "🍛 Add Rajma Rice (₹60)",
        "🫓 Add Dal + 2 Roti (₹40)",
        "📅 Weekly Plan (₹320)",
      ];
    }
  }

  // ==========================================================================
  // INTENT F: Price Inquiries (Specific Dish Price vs General Budget/Prices)
  // ==========================================================================
  else if (
    q.includes("cheap") ||
    q.includes("budget") ||
    q.includes("under") ||
    q.includes("lowest") ||
    q.includes("rate") ||
    q.includes("price") ||
    q.includes("how much") ||
    q.includes("cost")
  ) {
    // Check if the user is asking about a specific item's price (e.g. "price of Classic Thali")
    const specificDish = retrieved.find((c) => c.category === "menu" && c.item && (q.includes(c.item.name.toLowerCase()) || c.relevanceScore >= 0.45));

    if (specificDish && specificDish.item) {
      const it = specificDish.item;
      reply = `**${it.name}** is priced at **₹${it.price}**${it.halfPrice ? ` (Half Plate: ₹${it.halfPrice})` : ""}.

• **Category**: ${it.category}
• **Portion**: ${it.portion}
• **Description**: ${it.description}
• **Status**: ${it.available ? "✅ Available now" : "⚠️ Currently Sold Out"}`;

      actionSuggested = {
        type: "ADD_TO_CART",
        item: it,
        qty: 1,
        price: it.price,
        label: `Add ${it.name} (₹${it.price}) to Cart`,
      };

      quickReplies = [
        `Add ${it.name} to Cart`,
        "🍱 View Other Thalis",
        "🍛 Check Rice Bowls",
        "📞 Contact Kitchen",
      ];
    } else if (q.includes("cheap") || q.includes("lowest") || q.includes("under 50") || q.includes("under 60") || q.includes("under 70")) {
      reply = `Here are our best budget-friendly homestyle options:

• **Under ₹45**:
  - Dal + 2 Roti: **₹40** (tempered yellow dal + 2 soft phulkas)
  - 1 Sabzi + 2 Roti: **₹45**
  - Dal Rice (Half Plate): **₹35**
  - Rajma Rice / Chole Rice / Kadhi Rice (Half Plate): **₹40**
  - Veg Maggi / Poha / Upma: **₹40** each

• **Under ₹70**:
  - Aloo Paratha + Curd (1 pc): **₹50**
  - Mix Veg + 2 Roti: **₹50**
  - Rajma + 2 Roti / Chole + 2 Roti: **₹55**
  - Rajma Rice / Chole Rice / Kadhi Rice (Full Plate): **₹60**
  - Dal + 4 Roti: **₹60**
  - Basic Combo Meal: **₹70** (Complete full plate with sabzi, dal, 4 rotis, rice & salad)`;

      quickReplies = [
        "🫓 Order Dal + 2 Roti (₹40)",
        "🍛 Order Rajma Rice (₹60)",
        "🍱 Order Basic Meal (₹70)",
      ];
    } else {
      reply = `Here is our complete pricing structure:
• **Combo Meals (Full Thalis)**:
  - Basic Meal: ₹70 | Classic Thali: ₹90 | Special Thali: ₹110 | Premium Thali: ₹130
• **Roti Meals (1 Sabzi + Rotis)**:
  - Starting from ₹40 (Dal + 2 Roti) up to ₹90 (Paneer + 4 Roti)
• **Rice Meals**:
  - Full plates from ₹55 to ₹80 | Half plates from ₹35 to ₹50
• **Snacks**:
  - Parathas with curd from ₹50 to ₹90 | Maggi, Poha, Upma at ₹40
• **Extras**:
  - Extra Roti: ₹10 | Extra Rice: ₹15 | Raita: ₹15 | Salad: ₹15 | Papad: ₹10 | Achar: ₹10`;

      quickReplies = [
        "🍱 Classic Thali (₹90)",
        "🍛 Rajma Rice (₹60)",
        "📅 Weekly Plan (₹320)",
      ];
    }
  }

  // ==========================================================================
  // INTENT G: Thali Comparison & Breakdown
  // ==========================================================================
  else if (q.includes("thali") || q.includes("difference") || q.includes("compare")) {
    reply = `Here is how our 4 signature Combo Thalis compare:

1. **Basic Meal (₹70)**:
   • 1 Sabzi (150g), Dal (150ml), 4 Roti, Rice (150g), Salad (onion, cucumber).
   • Simple, filling, and light on the stomach.

2. **Classic Thali (₹90)** — *Office Bestseller*:
   • 1 Sabzi (150g), Dal (150ml), 4 Roti, Rice (150g), Salad + **Cooling Boondi Raita (100ml)**.

3. **Special Thali (₹110)**:
   • **Paneer or Seasonal Specialty Sabzi (150g)**, Dal (150ml), 4 Roti, Rice (150g), Salad + Raita (100ml).

4. **Premium Thali (₹130)**:
   • Bigger portions: Sabzi (200g), Dal (200ml), 4 Roti, Rice (200g), Salad, Raita (100ml) + **Crispy Roasted Papad (1 pc)**.`;

    quickReplies = [
      "🍱 Add Classic Thali (₹90)",
      "🍱 Add Special Thali (₹110)",
      "🍱 Add Premium Thali (₹130)",
    ];
  }

  // ==========================================================================
  // INTENT H: Kitchen Hygiene, Pure Veg, MSG & Ingredients
  // ==========================================================================
  else if (
    q.includes("hygiene") ||
    q.includes("msg") ||
    q.includes("pure veg") ||
    q.includes("vegetarian") ||
    q.includes("oil") ||
    q.includes("clean") ||
    q.includes("healthy") ||
    q.includes("atta") ||
    q.includes("maida") ||
    q.includes("preservative")
  ) {
    reply = `At GharSwaad, food safety, purity, and hygiene are our top priorities:

✅ **100% Pure Vegetarian**: We only prepare pure vegetarian food in a dedicated sanitized kitchen.
✅ **Strictly NO MSG**: Zero monosodium glutamate or artificial enhancers.
✅ **100% Whole-Wheat Rotis**: We use pure chakki whole-wheat flour with absolutely NO maida.
✅ **Zero Preservatives**: Cooked fresh every single morning from scratch — no stored curries.
✅ **Balanced Spices & Minimal Oil**: Cooked light like homemade mom's food so you never feel sluggish or heavy after lunch.
✅ **Hygienic Packaging**: Packed in leak-proof, food-grade containers with sanitized handling.`;

    quickReplies = [
      "🍱 Browse Fresh Thalis",
      "📅 Weekly Lunch Pass (₹320)",
      "📞 Talk to Kitchen",
    ];
  }

  // ==========================================================================
  // INTENT I: Order Tracking & Status
  // ==========================================================================
  else if (
    q.includes("track") ||
    q.includes("status") ||
    q.includes("where is my order") ||
    q.includes("late") ||
    q.includes("cancel")
  ) {
    reply = `You can easily track your order live:

1. Click **Track Order** in the top navigation bar.
2. Enter your **Order ID** (e.g. GS-1024) or your **10-digit mobile number**.
3. You will see real-time status: *Pending ➔ Confirmed ➔ Preparing ➔ Out for Delivery ➔ Delivered*.

Need to modify or cancel?
Orders can be canceled within **15 minutes** of placing by calling Kitchen Support at **+91 93544 29850**.`;

    actionSuggested = {
      type: "WHATSAPP_SUPPORT",
      phone: "9354429850",
      label: "Check Order Status on WhatsApp",
    };

    quickReplies = [
      "📞 Call Kitchen Hotline",
      "🍱 View Full Menu",
    ];
  }

  // ==========================================================================
  // INTENT J: Specific Single Dish Inquiries (e.g. "tell me about rajma", "upma")
  // ==========================================================================
  else if (retrieved.length > 0 && retrieved[0].category === "menu" && retrieved[0].item) {
    const it = retrieved[0].item;
    reply = `Here is information on **${it.name}**:

• **Category**: ${it.category}
• **Price**: ₹${it.price}${it.halfPrice ? ` (Half Plate: ₹${it.halfPrice})` : ""}
• **Portion**: ${it.portion}
• **Ingredients**: ${it.ingredients.join(", ")}
• **Description**: ${it.description}
• **Availability**: ${it.available ? "✅ Fresh & Available today" : "⚠️ Currently Sold Out"}`;

    actionSuggested = {
      type: "ADD_TO_CART",
      item: it,
      qty: 1,
      price: it.price,
      label: `Add ${it.name} (₹${it.price}) to Cart`,
    };

    quickReplies = [
      `Add ${it.name} to Cart`,
      "🍱 View Other Thalis",
      "🍛 Check Rice Bowls",
      "📞 Contact Kitchen",
    ];
  }

  // ==========================================================================
  // DEFAULT GHARSWAAD ASSISTANT FALLBACK
  // ==========================================================================
  else {
    reply = `Namaste! 🙏 I am your GharSwaad Food & Support Assistant.

I can help you with:
• Picking the perfect daily lunch thali or rice bowl
• Adding items directly to your cart
• Setting up Weekly (₹320) or Monthly (₹1,400) office lunch passes
• Checking delivery coverage in Khayala, Vishnu Garden & nearby areas
• Connecting you directly with Kitchen Support (+91 93544 29850)

What would you like to have today?`;

    quickReplies = [
      "🍱 What are the Thalis?",
      "🍛 Rajma Chawal (₹60)",
      "📅 Weekly Lunch Plan (₹320)",
      "📞 WhatsApp Customer Care",
    ];
  }

  // Build clean, relevant retrieved sources citations
  const cleanSources = retrieved
    .filter((r) => r.relevanceScore >= 0.2)
    .map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      excerpt: r.content.slice(0, 150) + "...",
      relevanceScore: r.relevanceScore,
    }));

  return {
    reply,
    retrievedSources: cleanSources,
    actionSuggested,
    quickReplies,
  };
}

module.exports = {
  KNOWLEDGE_CHUNKS,
  retrieveKnowledge,
  checkDomainRelevance,
  processChatMessage,
};
