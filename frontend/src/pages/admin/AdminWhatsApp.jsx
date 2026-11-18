import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Copy,
  Sparkles,
  Users,
  Search,
  Check,
  Phone,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  Bot,
  Zap,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Settings,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { WHATSAPP_TEMPLATES } from "../../components/admin/WhatsAppTemplateModal";
import { whatsappApi } from "../../services/api";
import { inr, fmtDate, cn } from "../../utils/formatters";

export function AdminWhatsApp() {
  const { orders } = useStore();

  // Navigation tab: 'automation' | 'sender' | 'gateway'
  const [activeTab, setActiveTab] = useState("automation");

  // Automation Settings State
  const [automationSettings, setAutomationSettings] = useState({
    enabled: true,
    autoSendOnNewOrder: true,
    autoSendOnStatusChange: true,
    provider: "simulation",
    metaPhoneNumberId: "",
    metaAccessToken: "",
    ultraMsgInstance: "",
    ultraMsgToken: "",
    webhookUrl: "",
    aiTone: "homestyle",
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Live Automation Logs Feed
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Manual Template Sender State
  const [selectedTemplateId, setSelectedTemplateId] = useState("daily_menu_broadcast");
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || "");
  const [manualPhone, setManualPhone] = useState("");
  const [manualName, setManualName] = useState("");
  const [customText, setCustomText] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);
  const targetName = manualName.trim() || selectedOrder?.customer?.name || "Customer";
  const targetPhone = manualPhone.trim() || selectedOrder?.customer?.whatsapp || selectedOrder?.customer?.phone || "";

  // Simulator test console state
  const [testEvent, setTestEvent] = useState("ORDER_CONFIRMED");
  const [testName, setTestName] = useState("Saiyam (Owner)");
  const [testPhone, setTestPhone] = useState("9354429850");
  const [testRunning, setTestRunning] = useState(false);
  const [broadcastRunning, setBroadcastRunning] = useState(false);

  const handleTestAutoDispatch = async () => {
    if (!testPhone.trim()) {
      toast.error("Please enter a recipient phone number");
      return;
    }
    setTestRunning(true);
    try {
      const res = await whatsappApi.dispatchManual({
        phone: testPhone,
        name: testName,
        templateType: testEvent,
        orderId: `GS-${Math.floor(1000 + Math.random() * 9000)}`,
        total: 180,
        address: "Ravi Nagar Extension, Khayala, Vishnu Garden, New Delhi - 110018",
      });
      if (res.data?.success) {
        toast.success(`⚡ AI Auto-Message dispatched automatically for ${testEvent}!`);
        await fetchLogs();
      }
    } catch (err) {
      toast.error("Failed to trigger automated dispatch test");
    } finally {
      setTestRunning(false);
    }
  };

  const handleMassBroadcast = async () => {
    setBroadcastRunning(true);
    try {
      const res = await whatsappApi.broadcastAll({ templateType: "DAILY_MENU_BROADCAST" });
      if (res.data?.success) {
        toast.success(`🍱 Morning Menu Broadcast sent to ${res.data.data.dispatchedCount} customer(s)!`);
        await fetchLogs();
      }
    } catch (err) {
      toast.error("Failed to run mass broadcast");
    } finally {
      setBroadcastRunning(false);
    }
  };

  // Fetch settings & logs on mount
  useEffect(() => {
    fetchSettings();
    fetchLogs();

    // Auto-refresh logs every 6 seconds to show real-time auto-dispatches
    const interval = setInterval(fetchLogs, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await whatsappApi.getSettings();
      if (res.data?.success && res.data?.data) {
        setAutomationSettings(res.data.data);
      }
    } catch (err) {
      console.warn("Could not load backend WhatsApp settings:", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await whatsappApi.getLogs(30);
      if (res.data?.success && res.data?.data) {
        setLogs(res.data.data);
      }
    } catch (err) {
      console.warn("Could not load WhatsApp logs:", err);
    }
  };

  const handleUpdateSettings = async (updates) => {
    const updated = { ...automationSettings, ...updates };
    setAutomationSettings(updated);
    setSettingsLoading(true);
    try {
      await whatsappApi.updateSettings(updates);
      toast.success("AI Automation settings saved!");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  // Sync manual template preview
  useEffect(() => {
    const tpl = WHATSAPP_TEMPLATES.find((t) => t.id === selectedTemplateId);
    if (tpl) {
      const itemsSummary = selectedOrder?.items?.length
        ? selectedOrder.items.map((i) => `• ${i.name}${i.variant ? ` (${i.variant})` : ""} × ${i.qty}`).join("\n")
        : "• Classic Thali × 1";

      const text = tpl.buildText({
        name: targetName,
        orderId: selectedOrder?.id || "GS-1024",
        itemsSummary,
        total: selectedOrder?.total || 90,
        payment: selectedOrder?.payment || "Cash on Delivery",
        address: selectedOrder?.customer?.address || "Ravi Nagar Extension, Khayala, Vishnu Garden",
        trackingUrl: `${window.location.origin}/track?id=${selectedOrder?.id || "GS-1024"}`,
      });
      setCustomText(text);
    }
  }, [selectedTemplateId, selectedOrderId, targetName, manualPhone]);

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    toast.success("WhatsApp template copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendManual = () => {
    if (!targetPhone) {
      toast.error("Please enter or select a customer phone number");
      return;
    }
    const cleanPhone = targetPhone.replace(/\D/g, "").replace(/^0+/, "");
    const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(customText)}`;
    window.open(url, "_blank");
    toast.success(`Opening WhatsApp for ${targetName}...`);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Title */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          eyebrow="Automatic Kitchen Messaging"
          title="WhatsApp Automation & AI Desk"
          sub="Automatically send customized WhatsApp order confirmations, cooking alerts, and delivery dispatches to customers without manual clicking."
        />
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all",
              automationSettings.enabled
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                automationSettings.enabled ? "bg-emerald-600 animate-ping" : "bg-muted-foreground"
              )}
            />
            {automationSettings.enabled ? "AI Auto-Dispatch: ACTIVE" : "Automation: PAUSED"}
          </span>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b border-border/80 gap-3">
        {[
          { id: "automation", label: "AI Auto-Dispatch Stream", icon: Zap, count: logs.length },
          { id: "sender", label: "Manual Template Sender", icon: Send },
          { id: "gateway", label: "API Gateway & Settings", icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 pb-3.5 px-3 text-sm font-bold border-b-2 transition-all",
                activeTab === tab.id
                  ? "border-primary text-primary-deep"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-primary">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: AI AUTOMATION CONTROLS & LIVE STREAM */}
      {/* ==================================================================== */}
      {activeTab === "automation" && (
        <div className="space-y-6">
          {/* Automation Control Panel Card */}
          <div className="rounded-3xl border border-border bg-gradient-to-r from-emerald-50/50 via-card to-amber-50/40 p-6 shadow-soft space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-soft">
                  <Bot className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-primary-deep flex items-center gap-2">
                    AI Auto-Dispatch Engine
                    <span className="rounded-full bg-emerald-200/80 px-2 py-0.5 text-[10px] font-bold text-emerald-900 uppercase">
                      Zero Manual Work
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Whenever an order is placed on your website or status is changed in the admin panel, the customer automatically receives the personalized WhatsApp message.
                  </p>
                </div>
              </div>

              {/* Master Toggle */}
              <div className="flex items-center gap-3 bg-card px-4 py-2.5 rounded-2xl border border-border shadow-2xs">
                <span className="text-xs font-bold text-foreground">
                  {automationSettings.enabled ? "Automation Enabled" : "Automation Disabled"}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateSettings({ enabled: !automationSettings.enabled })}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    automationSettings.enabled ? "bg-emerald-600" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
                      automationSettings.enabled ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Sub-triggers checkboxes */}
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={automationSettings.autoSendOnNewOrder}
                  onChange={(e) => handleUpdateSettings({ autoSendOnNewOrder: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <p className="text-xs font-bold text-foreground">Auto-Send on New Order</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Instantly sends order summary, bill total & live tracking link when customer checks out.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={automationSettings.autoSendOnStatusChange}
                  onChange={(e) => handleUpdateSettings({ autoSendOnStatusChange: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <p className="text-xs font-bold text-foreground">Auto-Send on Status Update</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Automatically sends when order moves to <i>Preparing</i>, <i>Out for Delivery</i>, or <i>Delivered</i>.
                  </p>
                </div>
              </label>

              <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                <p className="text-xs font-bold text-foreground">AI Messaging Tone</p>
                <select
                  value={automationSettings.aiTone}
                  onChange={(e) => handleUpdateSettings({ aiTone: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="homestyle">Homestyle & Warm (Desi Swaad)</option>
                  <option value="festive">Festive & Energetic</option>
                  <option value="concise">Concise & Professional</option>
                </select>
                <p className="text-[10px] text-muted-foreground">Adjusts greetings & emojis dynamically.</p>
              </div>
            </div>
          </div>

          {/* Test & Trigger AI Auto-Dispatch Console */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white shadow-soft">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-sm text-emerald-950 flex items-center gap-2">
                    Test & Witness AI Auto-Dispatch
                    <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                      Zero Manual Work
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Test how our backend AI instantly generates and transmits automated messages to customers upon events.
                  </p>
                </div>
              </div>

              {/* 1-Click Mass Broadcast Button */}
              <button
                type="button"
                disabled={broadcastRunning}
                onClick={handleMassBroadcast}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-amber-700 transition-colors shadow-2xs disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {broadcastRunning ? "Broadcasting..." : "🍱 1-Click Morning Broadcast to All Customers"}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-4 items-end">
              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                  Event / Message Type
                </label>
                <select
                  value={testEvent}
                  onChange={(e) => setTestEvent(e.target.value)}
                  className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ORDER_CONFIRMED">Order Confirmation (On Checkout)</option>
                  <option value="ORDER_PREPARING">Kitchen Cooking (Tawa Puffing)</option>
                  <option value="ORDER_OUT_FOR_DELIVERY">Rider Out for Delivery</option>
                  <option value="ORDER_DELIVERED">Delivered + Feedback Prompt</option>
                  <option value="DAILY_MENU_BROADCAST">Morning 10:30 AM Menu Special</option>
                  <option value="WEEKLY_PASS_OFFER">Weekly Pass Savings Offer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Customer Name"
                  className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-medium text-emerald-950"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                  Phone (WhatsApp)
                </label>
                <input
                  type="text"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="9354429850"
                  className="w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-medium text-emerald-950 font-mono"
                />
              </div>

              <div>
                <button
                  type="button"
                  disabled={testRunning}
                  onClick={handleTestAutoDispatch}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-emerald-700 transition-colors shadow-soft disabled:opacity-50"
                >
                  <Zap className="h-4 w-4" />
                  {testRunning ? "Dispatching..." : "⚡ Trigger AI Auto-Send"}
                </button>
              </div>
            </div>
          </div>

          {/* Live Automated Dispatch Feed */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                  <Radio className="h-4 w-4 animate-pulse" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-primary-deep">
                    Live Automated WhatsApp Stream
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time audit log of messages automatically dispatched by the AI system.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchLogs}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh Stream
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground space-y-2">
                <p className="text-sm font-semibold">No automated dispatches yet.</p>
                <p className="text-xs">
                  Place an order or update any order status in Live Orders to see the automation trigger in real-time!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20 px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wide">
                          {log.eventType}
                        </span>
                        <span className="font-bold text-xs text-primary">{log.orderId}</span>
                        <span className="text-xs text-foreground font-semibold">
                          {log.customerName}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          ({log.recipientPhone})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {log.messageExcerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-bold text-primary-deep hover:bg-muted transition-colors"
                      >
                        Inspect
                      </button>
                      <a
                        href={log.directWhatsAppUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                        title="Open in WhatsApp"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Open
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: MANUAL TEMPLATE SENDER & BROADCAST */}
      {/* ==================================================================== */}
      {activeTab === "sender" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left Column: Form & Template Gallery */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
              <h2 className="font-display text-base font-bold text-primary-deep flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" /> 1. Select Recipient
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Choose from Recent Orders
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => {
                      setSelectedOrderId(e.target.value);
                      const o = orders.find((x) => x.id === e.target.value);
                      if (o) {
                        setManualName(o.customer?.name || "");
                        setManualPhone(o.customer?.whatsapp || o.customer?.phone || "");
                      }
                    }}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Manual / Direct Number --</option>
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.id} — {o.customer?.name} ({o.customer?.phone}) · {inr(o.total)} [{o.status}]
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Recipient WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="10-digit customer WhatsApp number"
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-2 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-base font-bold text-primary-deep flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" /> 2. Choose Message Template
                </h2>
                <div className="flex gap-1">
                  {["All", "Order Updates", "Promotions"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCategory(c)}
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-bold transition-all",
                        activeCategory === c
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {WHATSAPP_TEMPLATES.filter((t) => activeCategory === "All" || t.category === activeCategory).map(
                  (tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs",
                        selectedTemplateId === tpl.id
                          ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30"
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl">{tpl.emoji}</span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                          {tpl.category}
                        </span>
                      </div>
                      <h3 className="mt-2 font-bold text-sm text-foreground">{tpl.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Preview Box */}
          <div className="space-y-6">
            <div className="sticky top-6 rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-display font-bold text-base text-primary-deep">
                    WhatsApp Message Preview
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    To: <b className="text-foreground">{targetName}</b> ({targetPhone || "Not set"})
                  </p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white">
                  <MessageCircle className="h-5 w-5" />
                </span>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-[#efeae2] p-4 shadow-inner">
                <div className="rounded-2xl rounded-tl-sm bg-[#d9fdd3] p-3.5 text-xs text-[#111b21] shadow-xs space-y-3 leading-relaxed">
                  <textarea
                    rows={13}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full bg-transparent resize-y font-sans text-xs text-[#111b21] focus:outline-none leading-relaxed border-0 p-0"
                    placeholder="WhatsApp message text..."
                  />

                  <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground pt-1 border-t border-emerald-200/50">
                    <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    <span className="text-sky-600 font-bold">✓✓</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSendManual}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-soft hover:bg-emerald-700 transition-all hover:scale-[1.01]"
                >
                  <Send className="h-4 w-4" /> Send on WhatsApp Now
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary py-3 text-xs font-bold text-foreground hover:bg-muted transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied to Clipboard!" : "Copy Formatted Text"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: API GATEWAY & CLOUD PROVIDER CONFIGURATION */}
      {/* ==================================================================== */}
      {activeTab === "gateway" && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-primary-deep flex items-center gap-2">
                <Sliders className="h-5 w-5 text-accent" /> WhatsApp Dispatch Gateway
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Configure your preferred delivery pipeline for 100% automated message transmission.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Provider Pipeline
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: "simulation",
                      name: "Smart Automated Queue",
                      desc: "Instant automated dispatch with audit feed and 1-click fallback. No setup required.",
                    },
                    {
                      id: "meta_cloud",
                      name: "Meta WhatsApp Cloud API",
                      desc: "Official Meta Graph API. Directly transmits to customer phones automatically.",
                    },
                    {
                      id: "ultramsg",
                      name: "UltraMsg / WhatsApp Gateway",
                      desc: "Automated WhatsApp gateway via instance ID and token.",
                    },
                    {
                      id: "webhook",
                      name: "Custom Webhook Dispatcher",
                      desc: "Dispatches HTTP POST payloads to your own automation server / Zapier / Make.",
                    },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleUpdateSettings({ provider: p.id })}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all",
                        automationSettings.provider === p.id
                          ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30 font-bold"
                          : "border-border bg-background hover:border-primary/40"
                      )}
                    >
                      <p className="font-bold text-sm text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta Cloud API inputs */}
              {automationSettings.provider === "meta_cloud" && (
                <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
                  <p className="text-xs font-bold text-foreground">Meta Cloud API Credentials</p>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      Phone Number ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 104523948572910"
                      value={automationSettings.metaPhoneNumberId}
                      onChange={(e) =>
                        setAutomationSettings({ ...automationSettings, metaPhoneNumberId: e.target.value })
                      }
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      System User Access Token
                    </label>
                    <input
                      type="password"
                      placeholder="EAAGm..."
                      value={automationSettings.metaAccessToken}
                      onChange={(e) =>
                        setAutomationSettings({ ...automationSettings, metaAccessToken: e.target.value })
                      }
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* UltraMsg inputs */}
              {automationSettings.provider === "ultramsg" && (
                <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
                  <p className="text-xs font-bold text-foreground">UltraMsg Credentials</p>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      Instance ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. instance12345"
                      value={automationSettings.ultraMsgInstance}
                      onChange={(e) =>
                        setAutomationSettings({ ...automationSettings, ultraMsgInstance: e.target.value })
                      }
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">Token</label>
                    <input
                      type="password"
                      placeholder="e.g. abcd1234efgh"
                      value={automationSettings.ultraMsgToken}
                      onChange={(e) =>
                        setAutomationSettings({ ...automationSettings, ultraMsgToken: e.target.value })
                      }
                      className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Webhook inputs */}
              {automationSettings.provider === "webhook" && (
                <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
                  <p className="text-xs font-bold text-foreground">Custom Webhook Endpoint</p>
                  <input
                    type="url"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={automationSettings.webhookUrl}
                    onChange={(e) =>
                      setAutomationSettings({ ...automationSettings, webhookUrl: e.target.value })
                    }
                    className="w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-mono"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => handleUpdateSettings(automationSettings)}
                className="w-full rounded-2xl bg-primary py-3 text-xs font-bold text-white shadow-soft hover:bg-primary-deep transition-all"
              >
                Save Gateway Pipeline Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Log Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedLog(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-primary-deep">
                  Auto-Dispatched Message Details
                </h3>
                <p className="text-xs text-muted-foreground">
                  Order: <b>{selectedLog.orderId}</b> · To: {selectedLog.customerName} ({selectedLog.recipientPhone})
                </p>
              </div>
              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">
                {selectedLog.eventType}
              </span>
            </div>

            <div className="rounded-2xl bg-[#efeae2] p-4 text-xs font-sans whitespace-pre-wrap leading-relaxed border border-emerald-200">
              {selectedLog.fullMessage}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Sent: {new Date(selectedLog.timestamp).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Close
                </button>
                <a
                  href={selectedLog.directWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> Open in WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
