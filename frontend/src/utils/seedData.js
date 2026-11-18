import thali from "../assets/thali.jpg";
import roti from "../assets/roti.jpg";
import rice from "../assets/rice.jpg";
import snack from "../assets/snack.jpg";

export const IMAGES = {
  "Combo Meals": thali,
  "Roti Meals": roti,
  "Rice Meals": rice,
  "Snacks": snack,
  "Extras": roti,
  "Meal Plans": thali,
};

// High-definition classic Indian culinary photography per dish type
export const DISH_IMAGES = {
  // Combos / Thalis
  "Basic Meal": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
  "Classic Thali": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "Special Thali": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  "Premium Thali": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",

  // Roti Meals
  "Dal + 2 Roti": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "Dal + 4 Roti": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "1 Sabzi + 2 Roti": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  "1 Sabzi + 4 Roti": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  "Mix Veg + 2 Roti": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "Mix Veg + 4 Roti": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "Chole + 2 Roti": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  "Chole + 4 Roti": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  "Rajma + 2 Roti": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
  "Rajma + 4 Roti": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
  "Paneer Sabzi + 2 Roti": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  "Paneer Sabzi + 4 Roti": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",

  // Rice Meals
  "Rajma Rice": "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
  "Chole Rice": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
  "Kadhi Rice": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  "Dal Rice": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "Jeera Rice + Sabzi": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  "Veg Pulao + Raita": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  "Paneer Pulao + Raita": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",

  // Snacks
  "Aloo Paratha + Curd (1 pc)": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  "Aloo Paratha + Curd (2 pcs)": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  "Paneer Paratha + Curd (1 pc)": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  "Paneer Paratha + Curd (2 pcs)": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  "Veg Maggi": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
  "Poha": "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80",
  "Upma": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",

  // Extras
  "Extra Roti": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  "Extra Rice (plain)": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
  "Raita (small bowl)": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  "Green Salad (small bowl)": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  "Papad": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
  "Achar (small portion)": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",

  // Meal Plans
  "Weekly Lunch Plan (5 days)": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
  "Monthly Lunch Plan (22 days)": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
};

let n = 0;
const mk = (category, name, price, portion, description, ingredients, halfPrice) => ({
  id: `m${++n}`,
  name,
  category,
  description,
  price,
  halfPrice,
  portion,
  ingredients,
  image: DISH_IMAGES[name] || thali,
  available: true,
});

export const INITIAL_MENU = [
  // 1. COMBO MEALS (FULL PLATE) - Complete meal with 1 sabzi, dal, roti, rice and salad
  mk(
    "Combo Meals",
    "Basic Meal",
    70,
    "1 Sabzi (150 g) · Dal (150 ml) · 4 Roti · Rice (150 g) · Salad (onion, cucumber)",
    "Simple & wholesome everyday comfort meal cooked fresh in desi style.",
    ["1 Sabzi (150g)", "Dal (150ml)", "4 Roti", "Rice (150g)", "Salad (onion, cucumber)"]
  ),
  mk(
    "Combo Meals",
    "Classic Thali",
    90,
    "1 Sabzi (150 g) · Dal (150 ml) · 4 Roti · Rice (150 g) · Salad + Raita (100 ml)",
    "Our most-loved everyday office thali with cooling seasoned boondi raita.",
    ["1 Sabzi (150g)", "Dal (150ml)", "4 Roti", "Rice (150g)", "Salad", "Raita (100ml)"]
  ),
  mk(
    "Combo Meals",
    "Special Thali",
    110,
    "1 Sabzi (150 g) · Dal (150 ml) · 4 Roti · Rice (150 g) · Salad + Raita (100 ml)",
    "Special thali featuring Paneer or seasonal specialty sabzi with raita.",
    ["Paneer / Seasonal Sabzi (150g)", "Dal (150ml)", "4 Roti", "Rice (150g)", "Salad", "Raita (100ml)"]
  ),
  mk(
    "Combo Meals",
    "Premium Thali",
    130,
    "1 Sabzi (200 g) · Dal (200 ml) · 4 Roti · Rice (200 g) · Salad + Raita (100 ml) · Papad (1 pc)",
    "Bigger portions with crispy roasted papad, generous dal, sabzi & rice.",
    ["1 Sabzi (200g)", "Dal (200ml)", "4 Roti", "Rice (200g)", "Salad", "Raita (100ml)", "Papad (1 pc)"]
  ),

  // 2. ROTI MEALS (1 SABZI ONLY) - Simple meals with 1 sabzi and fresh rotis
  mk("Roti Meals", "Dal + 2 Roti", 40, "Dal (200 ml) + 2 Roti", "Homestyle tempered yellow dal with 2 fresh whole-wheat rotis.", ["Dal (200ml)", "2 Roti"]),
  mk("Roti Meals", "Dal + 4 Roti", 60, "Dal (200 ml) + 4 Roti", "Hearty bowl of homestyle dal with 4 fresh tawa rotis.", ["Dal (200ml)", "4 Roti"]),
  mk("Roti Meals", "1 Sabzi + 2 Roti", 45, "Sabzi (200 g) + 2 Roti", "Seasonal daily sabzi with 2 soft tawa rotis.", ["Sabzi (200g)", "2 Roti"]),
  mk("Roti Meals", "1 Sabzi + 4 Roti", 65, "Sabzi (200 g) + 4 Roti", "Seasonal daily sabzi with 4 soft tawa rotis.", ["Sabzi (200g)", "4 Roti"]),
  mk("Roti Meals", "Mix Veg + 2 Roti", 50, "Mix Veg (200 g) + 2 Roti", "Fresh mixed vegetables cooked in mild desi spices with 2 rotis.", ["Mix Veg (200g)", "2 Roti"]),
  mk("Roti Meals", "Mix Veg + 4 Roti", 70, "Mix Veg (200 g) + 4 Roti", "Fresh mixed vegetables cooked in mild desi spices with 4 rotis.", ["Mix Veg (200g)", "4 Roti"]),
  mk("Roti Meals", "Chole + 2 Roti", 55, "Chole (200 g) + 2 Roti", "Punjabi style aromatic spiced chole with 2 rotis.", ["Chole (200g)", "2 Roti"]),
  mk("Roti Meals", "Chole + 4 Roti", 75, "Chole (200 g) + 4 Roti", "Punjabi style aromatic spiced chole with 4 rotis.", ["Chole (200g)", "4 Roti"]),
  mk("Roti Meals", "Rajma + 2 Roti", 55, "Rajma (200 g) + 2 Roti", "Slow-cooked homestyle rajma with 2 soft phulkas.", ["Rajma (200g)", "2 Roti"]),
  mk("Roti Meals", "Rajma + 4 Roti", 75, "Rajma (200 g) + 4 Roti", "Slow-cooked homestyle rajma with 4 soft phulkas.", ["Rajma (200g)", "4 Roti"]),
  mk("Roti Meals", "Paneer Sabzi + 2 Roti", 70, "Paneer (200 g) + 2 Roti", "Rich homemade paneer sabzi with 2 soft phulkas.", ["Paneer (200g)", "2 Roti"]),
  mk("Roti Meals", "Paneer Sabzi + 4 Roti", 90, "Paneer (200 g) + 4 Roti", "Rich homemade paneer sabzi with 4 soft phulkas.", ["Paneer (200g)", "4 Roti"]),

  // 3. RICE MEALS (1 SABZI ONLY) - Tasty rice meals with 1 sabzi (homemade style)
  mk("Rice Meals", "Rajma Rice", 60, "Rice (250 g) + Rajma (200 g)", "Classic comforting Punjabi rajma over steamed basmati rice.", ["Rice (250g)", "Rajma (200g)"], 40),
  mk("Rice Meals", "Chole Rice", 60, "Rice (250 g) + Chole (200 g)", "Spiced Punjabi chole paired with fragrant steamed rice.", ["Rice (250g)", "Chole (200g)"], 40),
  mk("Rice Meals", "Kadhi Rice", 60, "Rice (250 g) + Kadhi (200 g)", "Tangy homestyle pakoda kadhi with steamed rice.", ["Rice (250g)", "Kadhi (200g)"], 40),
  mk("Rice Meals", "Dal Rice", 55, "Rice (250 g) + Dal (200 ml)", "Light and nutritious comforting dal-chawal with desi ghee tadka.", ["Rice (250g)", "Dal (200ml)"], 35),
  mk("Rice Meals", "Jeera Rice + Sabzi", 70, "Jeera Rice (250 g) + Sabzi (200 g)", "Aromatic tempered cumin rice with fresh seasonal vegetable sabzi.", ["Jeera Rice (250g)", "Sabzi (200g)"], 45),
  mk("Rice Meals", "Veg Pulao + Raita", 70, "Pulao (250 g) + Raita (100 ml)", "Fragrant spiced vegetable pulao served with cooling seasoned raita.", ["Pulao (250g)", "Raita (100ml)"], 45),
  mk("Rice Meals", "Paneer Pulao + Raita", 80, "Pulao (250 g) + Raita (100 ml)", "Delightful paneer-loaded pulao with chilled seasoned raita.", ["Paneer Pulao (250g)", "Raita (100ml)"], 50),

  // 4. SNACKS (EVENING)
  mk("Snacks", "Aloo Paratha + Curd (1 pc)", 50, "1 pc + 100 ml", "Crispy spiced potato-stuffed tawa paratha served with 100ml fresh curd.", ["Aloo Paratha (1 pc)", "Curd (100ml)"]),
  mk("Snacks", "Aloo Paratha + Curd (2 pcs)", 70, "2 pcs + 100 ml", "Two crispy stuffed aloo parathas with 100ml fresh curd.", ["Aloo Paratha (2 pcs)", "Curd (100ml)"]),
  mk("Snacks", "Paneer Paratha + Curd (1 pc)", 60, "1 pc + 100 ml", "Fresh cottage-cheese stuffed tawa paratha with 100ml curd.", ["Paneer Paratha (1 pc)", "Curd (100ml)"]),
  mk("Snacks", "Paneer Paratha + Curd (2 pcs)", 90, "2 pcs + 100 ml", "Two delicious paneer parathas with 100ml curd.", ["Paneer Paratha (2 pcs)", "Curd (100ml)"]),
  mk("Snacks", "Veg Maggi", 40, "1 bowl", "Hot masala maggi with green peas, carrots, and sweet corn.", ["Maggi", "Fresh Veggies"]),
  mk("Snacks", "Poha", 40, "1 bowl", "Indori-style flattened rice tempered with mustard, curry leaves and roasted peanuts.", ["Poha", "Peanuts", "Spices"]),
  mk("Snacks", "Upma", 40, "1 bowl", "Traditional roasted semolina upma with garden vegetables.", ["Rava", "Veggies", "Ghee"]),

  // 5. EXTRAS (SIDE ORDERS)
  mk("Extras", "Extra Roti", 10, "1 pc", "Freshly puffed 100% whole-wheat tawa roti.", ["Atta"]),
  mk("Extras", "Extra Rice (plain)", 15, "1 portion (150 g)", "Steamed long-grain rice.", ["Rice (150g)"]),
  mk("Extras", "Raita (small bowl)", 15, "100 ml", "Chilled boondi / cucumber curd with roasted cumin.", ["Curd (100ml)"]),
  mk("Extras", "Green Salad (small bowl)", 15, "1 bowl", "Sliced onion, cucumber, and fresh tomato with lemon.", ["Salad"]),
  mk("Extras", "Papad", 10, "1 pc", "Crispy roasted urad dal papad.", ["Papad (1 pc)"]),
  mk("Extras", "Achar (small portion)", 10, "30 g", "Homestyle tangy mango / mixed pickle.", ["Achar (30g)"]),

  // 6. MONTHLY / WEEKLY PLANS
  mk(
    "Meal Plans",
    "Weekly Lunch Plan (5 days)",
    320,
    "1 full meal per day (Fixed menu, Mon–Fri)",
    "Hassle-free 5-day office lunch subscription. Delicious variety delivered daily on time.",
    ["1 Full Thali/Meal Daily for 5 Days"]
  ),
  mk(
    "Meal Plans",
    "Monthly Lunch Plan (22 days)",
    1400,
    "1 full meal per day (Fixed menu, Mon–Fri)",
    "Best value 22-day working month lunch pass! Save more with dependable daily home-cooked lunch.",
    ["1 Full Thali/Meal Daily for 22 Days"]
  ),
];

export const INITIAL_SETTINGS = {
  businessName: "GharSwaad",
  phone: "+91 93544 29850",
  whatsapp: "919354429850",
  email: "saiyamrajput71@gmail.com",
  address: "Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018 (Delivery within 2–4 km)",
  hours: "Mon–Sat · 8:00 AM – 9:00 PM",
  deliveryFee: 20,
  freeDeliveryAbove: 300,
  minOrder: 40,
  upiId: "9354429850@upi",
  acceptingOrders: true,
};

export const INITIAL_CUSTOMERS = [
  { name: "Rahul Sharma", phone: "9811112233", whatsapp: "9811112233", address: "3rd Floor, Tower B, Logix Park", landmark: "Near Metro Gate 2", deliveryType: "Office", companyName: "Infoedge Pvt Ltd" },
  { name: "Priya Verma", phone: "9822223344", whatsapp: "9822223344", address: "H-42, Sector 22", landmark: "Opp. Park", deliveryType: "Home" },
  { name: "Amit Kumar", phone: "9833334455", whatsapp: "9833334455", address: "Plot 17, Phase 2 Industrial Area", landmark: "Behind Petrol Pump", deliveryType: "Small Industry/Workplace", companyName: "Kumar Fabricators" },
  { name: "Neha Gupta", phone: "9844445566", whatsapp: "9844445566", address: "Office 204, City Centre", landmark: "Above SBI", deliveryType: "Office", companyName: "Gupta & Co CA" },
  { name: "Suresh Yadav", phone: "9855556677", whatsapp: "9855556677", address: "B-9, Sector 15", landmark: "Near Temple", deliveryType: "Home" },
];

export function buildInitialOrders(now = new Date()) {
  const line = (id, qty, variant) => {
    const m = INITIAL_MENU.find((x) => x.id === id) || INITIAL_MENU[0];
    const price = variant && m.halfPrice ? m.halfPrice : m.price;
    return {
      key: `${id}-${variant || "Full"}`,
      itemId: id,
      name: m.name,
      portion: variant ? "Half" : (m.portion.split("·")[0] || "").trim(),
      variant: m.halfPrice ? (variant || "Full") : undefined,
      price,
      qty,
    };
  };

  const spec = [
    [0, 0, [line("m2", 2)], "Preparing", "UPI", 1],
    [1, 0, [line("m1", 3), line("m22", 3)], "Pending", "Cash on Delivery", 2],
    [2, 0, [line("m3", 4), line("m24", 4)], "Confirmed", "UPI", 3],
    [3, 0, [line("m15", 1), line("m18", 2)], "Out for Delivery", "Cash on Delivery", 4],
    [4, 0, [line("m17", 1, "Half")], "Delivered", "UPI", 5],
    [0, 1, [line("m2", 1)], "Delivered", "UPI", 1],
    [2, 1, [line("m4", 5)], "Delivered", "UPI", 1],
    [1, 2, [line("m29", 2)], "Cancelled", "Cash on Delivery", 1],
    [0, 3, [line("m1", 2)], "Delivered", "Cash on Delivery", 1],
    [3, 5, [line("m10", 2), line("m23", 1)], "Delivered", "UPI", 1],
    [0, 9, [line("m3", 1)], "Delivered", "UPI", 1],
    [4, 14, [line("m5", 2)], "Delivered", "Cash on Delivery", 1],
  ];

  const counters = {};
  return spec.map(([c, daysAgo, items, status, payment, hour]) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(9 + hour, 15 * hour, 0, 0);
    const ds = d.toISOString().slice(0, 10).replace(/-/g, "");
    counters[ds] = (counters[ds] || 0) + 1;
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const deliveryFee = subtotal >= 300 ? 0 : 20;
    return {
      id: `GS-${ds}-${String(counters[ds]).padStart(3, "0")}`,
      customer: INITIAL_CUSTOMERS[c],
      items,
      subtotal,
      deliveryFee,
      discount: 0,
      total: subtotal + deliveryFee,
      payment,
      status,
      createdAt: d.toISOString(),
    };
  });
}
