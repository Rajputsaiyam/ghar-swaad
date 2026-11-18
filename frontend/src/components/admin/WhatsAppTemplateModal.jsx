import React, { useState, useEffect } from "react";
import {
  X,
  MessageCircle,
  Copy,
  ExternalLink,
  Send,
  Sparkles,
  Check,
  User,
  ShoppingBag,
  FileText,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { inr, waLink, cn } from "../../utils/formatters";

export const WHATSAPP_TEMPLATES = [
  {
    id: "confirmed",
    name: "Order Confirmed",
    category: "Order Updates",
    emoji: "📦",
    description: "Send immediately when kitchen accepts order",
    buildText: ({ name, orderId, itemsSummary, total, payment, address, trackingUrl }) =>
`Namaste *${name || "Customer"}*! 🙏

Your GharSwaad order *#${orderId || "GS-1024"}* has been *CONFIRMED*!

📋 *Order Details*:
${itemsSummary || "• Fresh Thali"}

💰 *Total Payable*: ₹${total || "0"} (${payment || "Cash on Delivery"})
📍 *Delivery To*: ${address || "Your Address"}

Our central kitchen has queued your meal. Every dish is prepared fresh this morning with 100% whole-wheat tawa rotis and zero MSG.

Dispatched for hot lunch arrival by 12:45 PM.

🔍 *Track Live Status*:
${trackingUrl || "https://gharswaad.in/track"}

Kitchen Helpline: +91 93544 29850
*GharSwaad — Homemade Food, Happier Days*`,
  },

  {
    id: "preparing",
    name: "Cooking in Kitchen",
    category: "Order Updates",
    emoji: "👨‍🍳",
    description: "Notify customer that their food is on the tawa/stove",
    buildText: ({ name, orderId }) =>
`Namaste *${name || "Customer"}*! 👨‍🍳🔥

Great news! Your GharSwaad order *#${orderId || "GS-1024"}* is now *BEING FRESHLY COOKED* in our central kitchen.

• Phulkas are puffed fresh on hot tawa
• Sabzi & dal are slow-simmered with homestyle mild desi spices
• Packed in sterilized, food-grade sealed eco-containers

Will be packed and handed over to our delivery partner shortly!

Kitchen Helpline: +91 93544 29850`,
  },

  {
    id: "out_for_delivery",
    name: "Out for Delivery",
    category: "Order Updates",
    emoji: "🛵",
    description: "Alert customer that driver is en route",
    buildText: ({ name, orderId, address, total, payment }) =>
`Namaste *${name || "Customer"}*! 🛵💨

Your GharSwaad lunch *#${orderId || "GS-1024"}* is *OUT FOR DELIVERY*!

Our delivery rider is heading towards your address:
📍 *${address || "Your Address"}*

${payment === "Cash on Delivery" ? `💵 Please keep exact cash of *₹${total}* ready.` : `✅ Payment: *${payment}* (Paid)`}

Estimated arrival: 15–25 minutes.

Need urgent directions or gate pass info?
Call Kitchen Hotline: +91 93544 29850`,
  },

  {
    id: "delivered",
    name: "Delivered & Feedback",
    category: "Order Updates",
    emoji: "🍛",
    description: "Thank customer and ask for taste review",
    buildText: ({ name, orderId }) =>
`Namaste *${name || "Customer"}*! 🍛✨

Your GharSwaad meal *#${orderId || "GS-1024"}* has been successfully *DELIVERED*!

We hope you enjoy the authentic homemade taste! It was cooked with purity, pure ghee tadka, and zero MSG.

💬 *How was your food?*
Please reply to this message with your review or feedback — our cooks would love to know how it tasted!

Save on tomorrow's lunch with our Weekly Pass (₹320 for 5 days).

Have a wonderful, energizing day! 🙏`,
  },

  {
    id: "cancelled",
    name: "Order Cancelled / Refund",
    category: "Order Updates",
    emoji: "⚠️",
    description: "Confirm order cancellation and refund status",
    buildText: ({ name, orderId, total }) =>
`Namaste *${name || "Customer"}*! 🙏

Your GharSwaad order *#${orderId || "GS-1024"}* has been *CANCELLED* as requested.

If any online UPI payment of ₹${total || "0"} was deducted, it will be refunded to your original source within a few hours.

If you have any questions or would like to re-order, reply here or call our Kitchen Support at *+91 93544 29850*.

Thank you for choosing GharSwaad!`,
  },

  {
    id: "weekly_offer",
    name: "Weekly / Monthly Lunch Pass",
    category: "Promotions",
    emoji: "💼",
    description: "Offer regular office workers big discounts on monthly tiffins",
    buildText: ({ name }) =>
`Namaste *${name || "Colleague"}*! 💼🍱

Tired of ordering lunch every single day?
Switch to *GharSwaad Office Lunch Passes* & save money!

1️⃣ *Weekly Pass (5 Days - Mon to Fri)*:
• Just *₹320 total* (Cost comes to ₹64/fresh meal!)

2️⃣ *Monthly Pass (22 Working Days)*:
• Just *₹1,400 total* (~₹63.6/meal — maximum savings!)

✅ 100% Whole-Wheat Tawa Rotis · Zero MSG
✅ Different fresh seasonal sabzi everyday
✅ Delivered hot to your workplace by 12:45 PM
✅ Flexible: Pause/skip anytime with 24h prior notice

Reply *YES* to activate your pass today!
Phone/WhatsApp: +91 93544 29850`,
  },

  {
    id: "daily_menu_broadcast",
    name: "Daily Menu Announcement",
    category: "Promotions",
    emoji: "📢",
    description: "Broadcast today's special menu to office contacts",
    buildText: () =>
`Good Morning from GharSwaad Central Kitchen! ☀️🥘

*Today's Fresh Lunch Menu is Ready!*

🍱 *Combo Thalis*:
• Basic Meal (₹70): 1 Sabzi, Dal, 4 Roti, Rice & Salad
• Classic Thali (₹90): + Boondi Raita (Office Favourite!)
• Special Thali (₹110): Paneer Curry Special + Raita
• Premium Thali (₹130): Generous portions + Papad

🍛 *Comfort Rice Bowls*:
• Rajma Rice: ₹60 (Half: ₹40)
• Chole Rice: ₹60 (Half: ₹40)
• Kadhi Rice: ₹60 (Half: ₹40)

⏰ Pre-order before 11:30 AM for guaranteed 12:45 PM hot desk delivery.

Reply to this message with your order or call *+91 93544 29850*!`,
  },
];

export function WhatsAppTemplateModal({ isOpen, onClose, order, customerPhone, customerName }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("confirmed");
  const [customText, setCustomText] = useState("");
  const [copied, setCopied] = useState(false);

  // Derive parameters from order or defaults
  const cName = customerName || order?.customer?.name || "Customer";
  const cPhone = customerPhone || order?.customer?.whatsapp || order?.customer?.phone || "";
  const orderId = order?.id || "GS-1024";
  const total = order?.total || 90;
  const payment = order?.payment || "Cash on Delivery";
  const address = order?.customer?.address || "Ravi Nagar / Vishnu Garden";

  const itemsSummary = order?.items?.length
    ? order.items.map((i) => `• ${i.name}${i.variant ? ` (${i.variant})` : ""} × ${i.qty}`).join("\n")
    : "• Classic Thali × 1";

  const trackingUrl = `${window.location.origin}/track?id=${orderId}`;

  // Automatically update template text when selected template or order changes
  useEffect(() => {
    const tpl = WHATSAPP_TEMPLATES.find((t) => t.id === selectedTemplateId);
    if (tpl) {
      const generated = tpl.buildText({
        name: cName,
        orderId,
        itemsSummary,
        total,
        payment,
        address,
        trackingUrl,
      });
      setCustomText(generated);
    }
  }, [selectedTemplateId, order, cName, cPhone, total, address]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    toast.success("WhatsApp template copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    if (!cPhone) {
      toast.error("Please enter a valid customer phone number");
      return;
    }
    const cleanPhone = cPhone.replace(/\D/g, "").replace(/^0+/, "");
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(customText)}`;
    window.open(url, "_blank");
    toast.success(`Opening WhatsApp for ${cName}...`);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-soft animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-emerald-700 p-4 text-white">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-base leading-tight">
                Send WhatsApp Template
              </h3>
              <p className="text-xs text-white/80">
                To: <span className="font-bold text-white">{cName}</span> ({cPhone || "No Phone"}) {order ? `· Order #${orderId}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Template Selector Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Choose Pre-Approved Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {WHATSAPP_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border p-2.5 text-left text-xs transition-all",
                    selectedTemplateId === tpl.id
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-600"
                      : "border-border bg-card text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="text-base mb-1">{tpl.emoji}</span>
                  <span className="font-bold leading-snug">{tpl.name}</span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {tpl.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Chat Preview Container */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> Live WhatsApp Message (Editable)
              </label>
              <span className="text-[11px] text-muted-foreground">
                You can customize message text below before sending
              </span>
            </div>

            {/* Styled WhatsApp Chat Bubble */}
            <div className="rounded-2xl border border-emerald-200 bg-[#efeae2] p-4 shadow-inner">
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#d9fdd3] p-3.5 text-xs text-[#111b21] shadow-xs space-y-2 leading-relaxed">
                <textarea
                  rows={10}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-transparent resize-y font-sans text-xs sm:text-sm text-[#111b21] focus:outline-none leading-relaxed border-0 p-0"
                  placeholder="Type WhatsApp message..."
                />

                <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground pt-1 border-t border-emerald-200/40">
                  <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="text-sky-600 font-bold">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border bg-muted/30 p-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-emerald-700 transition-all hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" /> Open in WhatsApp Web / App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
