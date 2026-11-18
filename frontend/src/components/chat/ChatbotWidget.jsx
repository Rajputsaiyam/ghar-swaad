import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  Truck,
  CalendarCheck,
  Bot,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { chatApi } from "../../services/api";
import { useStore } from "../../context/StoreContext";
import { logoImage, inr, waLink, cn } from "../../utils/formatters";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Namaste! 🙏 I am your **GharSwaad Food & Support Assistant**.\n\nI can help you pick delicious thalis, recommend rice bowls, explain our Weekly & Monthly lunch passes, add items directly to your cart, or connect you instantly with our kitchen team!",
  retrievedSources: [
    {
      title: "GharSwaad Menu & Kitchen Standards",
      category: "menu",
      excerpt: "Full plate thalis from ₹70, 100% whole-wheat tawa rotis, zero MSG.",
      relevanceScore: 1.0,
    },
  ],
  quickReplies: [
    "🍱 What are the Thalis?",
    "🍛 Rajma Chawal (₹60)",
    "📅 Weekly Lunch Plan (₹320)",
    "🛵 Delivery to Vishnu Garden?",
    "📞 Talk to Customer Support",
  ],
};

export function ChatbotWidget() {
  const { addToCart, settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState({});
  const [addedActions, setAddedActions] = useState({});

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({ role: m.role, content: m.content }));
      const res = await chatApi.sendMessage(query, history);

      if (res.data?.success && res.data?.data) {
        const botData = res.data.data;
        const botMsg = {
          role: "assistant",
          content: botData.reply,
          retrievedSources: botData.retrievedSources || [],
          actionSuggested: botData.actionSuggested || null,
          quickReplies: botData.quickReplies || [],
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      // Local client fallback response with strict domain guardrails
      console.warn("RAG server query failed, using resilient client fallback:", err);
      const lower = query.toLowerCase();

      // Prohibited / out of domain food
      const unserved = ["pizza", "burger", "chicken", "mutton", "egg", "fish", "biryani", "noodles", "momos"];
      const isUnserved = unserved.some((u) => lower.includes(u));

      // General off-topic
      const offTopics = ["python", "code", "politics", "president", "weather", "cricket", "movie", "joke", "crypto"];
      const isOffTopic = offTopics.some((o) => lower.includes(o));

      let fallbackReply = "";
      let fallbackAction = null;
      let fallbackQuickReplies = ["🍱 View Today's Thalis", "🍛 Rajma Rice (₹60)", "📅 Weekly Plan (₹320)", "📞 Kitchen Support"];

      if (isUnserved) {
        fallbackReply = `GharSwaad is exclusively a **100% Pure Vegetarian homestyle kitchen**. We do not serve fast food or non-vegetarian items.\n\nWe prepare fresh, healthy everyday meals with 100% whole-wheat tawa rotis and zero MSG! Try our **Classic Thali (₹90)** or **Rajma Rice (₹60)** instead!`;
      } else if (isOffTopic) {
        fallbackReply = `Namaste! 🙏 I am the dedicated **GharSwaad Food & Support Assistant**.\n\nI can only assist with information related to **GharSwaad** — our daily lunch menu, pricing, homestyle thalis, meal passes, delivery coverage, or placing your order.\n\nHow can I help you with your homemade food order today?`;
      } else {
        fallbackReply = `Namaste! I am here to help you with GharSwaad homemade meals. You can order fresh Combo Thalis from ₹70, Rajma/Chole Chawal from ₹55, or subscribe to our Weekly Lunch Plan for ₹320.\n\nFor urgent orders or support, reach our kitchen directly at **+91 93544 29850**.`;
        fallbackAction = {
          type: "WHATSAPP_SUPPORT",
          phone: settings.phone || "9354429850",
          label: "Chat with Kitchen Support on WhatsApp",
        };
      }

      const botMsg = {
        role: "assistant",
        content: fallbackReply,
        actionSuggested: fallbackAction,
        quickReplies: fallbackQuickReplies,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action, msgIndex) => {
    if (action.type === "ADD_TO_CART" && action.item) {
      addToCart(action.item, action.qty || 1, action.variant);
      setAddedActions((prev) => ({ ...prev, [msgIndex]: true }));
      toast.success(`${action.qty || 1} × ${action.item.name} added to cart!`);
    }
  };

  const toggleSource = (idx) => {
    setExpandedSources((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-primary/20 bg-card py-2 px-3.5 text-xs font-bold text-primary-deep shadow-soft animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Need help ordering? Ask our Food Assistant!
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative grid h-14 w-14 place-items-center rounded-full shadow-soft transition-all duration-300 hover:scale-105",
            isOpen ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
          )}
          aria-label="Toggle Food Assistant"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <div className="relative">
                <MessageCircle className="h-7 w-7" />
                <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-accent ring-2 ring-white">
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                </span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[580px] max-h-[85vh] w-[92vw] sm:w-[410px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary-deep p-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/40 bg-white">
                <img src={logoImage} alt="GharSwaad" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm leading-tight flex items-center gap-1.5 text-white">
                  GharSwaad Food Assistant
                  <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[9px] font-bold text-gold uppercase">
                    RAG AI
                  </span>
                </h3>
                <p className="text-[11px] text-white/80">Online · Instant Kitchen Answers</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${settings.phone || "9354429850"}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Call Kitchen (9354429850)"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
              <a
                href={waLink(settings.whatsapp || "9354429850", "Hello GharSwaad, I need help with an order!")}
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg, index) => {
              const isBot = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={cn("flex flex-col", isBot ? "items-start" : "items-end")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs",
                      isBot
                        ? "bg-card text-foreground border border-border rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>

                    {/* Interactive Add to Cart Card inside bubble */}
                    {isBot && msg.actionSuggested?.type === "ADD_TO_CART" && msg.actionSuggested.item && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-primary/20 bg-secondary/50 p-2.5 space-y-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={msg.actionSuggested.item.image || logoImage}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover border border-border"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs truncate text-foreground">
                              {msg.actionSuggested.item.name}
                            </p>
                            <p className="text-[11px] text-accent font-bold">
                              {inr(msg.actionSuggested.price || msg.actionSuggested.item.price)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={addedActions[index]}
                          onClick={() => handleActionClick(msg.actionSuggested, index)}
                          className={cn(
                            "w-full inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-bold transition-all shadow-xs",
                            addedActions[index]
                              ? "bg-emerald-600 text-white"
                              : "bg-primary text-white hover:bg-primary-deep"
                          )}
                        >
                          {addedActions[index] ? (
                            <>
                              <Check className="h-3.5 w-3.5" /> Added to Cart!
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart (
                              {inr(msg.actionSuggested.price || msg.actionSuggested.item.price)})
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* WhatsApp Action Button inside bubble */}
                    {isBot && msg.actionSuggested?.type === "WHATSAPP_SUPPORT" && (
                      <div className="mt-3">
                        <a
                          href={waLink(
                            msg.actionSuggested.phone || "9354429850",
                            "Hello GharSwaad, I need help from support!"
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full rounded-lg bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {msg.actionSuggested.label || "Open WhatsApp Support"}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* RAG Retrieved Sources Citation Pill */}
                  {isBot && msg.retrievedSources && msg.retrievedSources.length > 0 && (
                    <div className="mt-1 text-[11px]">
                      <button
                        onClick={() => toggleSource(index)}
                        className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors font-medium px-1"
                      >
                        <Sparkles className="h-3 w-3 text-gold" />
                        <span>RAG Knowledge Sources ({msg.retrievedSources.length})</span>
                        {expandedSources[index] ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>

                      {expandedSources[index] && (
                        <div className="mt-1 max-w-[85%] rounded-xl border border-border bg-card p-2 text-[10px] space-y-1.5 shadow-xs">
                          {msg.retrievedSources.map((src, i) => (
                            <div key={i} className="border-b border-border/50 pb-1 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between text-primary font-bold">
                                <span>{src.title}</span>
                                <span className="text-[9px] text-muted-foreground">
                                  {Math.round(src.relevanceScore * 100)}% match
                                </span>
                              </div>
                              <p className="text-muted-foreground mt-0.5 line-clamp-2">
                                {src.excerpt}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Replies chips */}
                  {isBot &&
                    index === messages.length - 1 &&
                    msg.quickReplies &&
                    msg.quickReplies.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            type="button"
                            onClick={() => handleSend(qr)}
                            className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-all shadow-2xs"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-xl px-3 py-2 w-fit">
                <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                GharSwaad Assistant is searching kitchen knowledge...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-border bg-card p-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about meals, thalis, plans, or say 'add classic thali'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-input bg-background px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-white shadow-xs hover:bg-accent/90 disabled:opacity-40 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
