import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Printer, CheckCircle2 } from "lucide-react";
import { fmtDate, inr, waLink } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { StatusBadge } from "../../components/common/StatusBadge";
import { WhatsAppTemplateModal } from "../../components/admin/WhatsAppTemplateModal";

const ACTIONS = [
  ["Confirm Order", "Confirmed"],
  ["Start Cooking", "Preparing"],
  ["Mark Ready / Packed", "Ready"],
  ["Dispatch for Delivery", "Out for Delivery"],
  ["Mark Delivered", "Delivered"],
];

export function AdminOrderDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const shouldPrint = searchParams.get("print") === "true";
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const { orders, setStatus } = useStore();
  const order = orders.find((x) => x.id === id);

  useEffect(() => {
    if (shouldPrint && order) {
      const timer = setTimeout(() => window.print(), 350);
      return () => clearTimeout(timer);
    }
  }, [shouldPrint, order]);

  if (!order) {
    return (
      <div className="py-12">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/admin/orders" className="text-primary font-bold hover:underline mt-2 inline-block">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const c = order.customer || {};

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        to="/admin/orders"
        className="no-print inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-primary-deep">{order.id}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Placed on {fmtDate(order.createdAt)} · Payment: {order.payment}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Cards Grid: Customer & Items */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Information */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3 text-sm">
          <h2 className="font-display text-lg font-bold text-primary-deep border-b border-border/60 pb-2">
            Customer Information
          </h2>

          {[
            ["Name", c.name],
            ["Phone", c.phone],
            ["WhatsApp", c.whatsapp],
            ["Delivery Type", c.deliveryType],
            ["Company", c.companyName || "—"],
            ["Address", c.address],
            ["Landmark", c.landmark || "—"],
          ].map(([label, val]) => (
            <div key={label} className="grid grid-cols-[110px_1fr] text-xs">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-semibold text-foreground break-words">{val}</span>
            </div>
          ))}

          <div className="pt-2 no-print">
            <Link
              to={`/admin/customers/${c.phone}`}
              className="text-xs font-bold text-accent hover:underline"
            >
              View Full Customer Order History →
            </Link>
          </div>
        </div>

        {/* Order Items & Calculation */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs text-sm space-y-3">
          <h2 className="font-display text-lg font-bold text-primary-deep border-b border-border/60 pb-2">
            Dishes & Bill Breakdown
          </h2>

          <div className="divide-y divide-border/60 text-xs">
            {order.items?.map((item) => (
              <div key={item.key} className="py-2.5 flex justify-between">
                <div>
                  <p className="font-bold text-foreground">
                    {item.name} {item.variant && <span className="font-normal text-muted-foreground">({item.variant})</span>}
                  </p>
                  <p className="text-muted-foreground">
                    {inr(item.price)} × {item.qty}
                  </p>
                </div>
                <span className="font-semibold text-foreground">
                  {inr(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{inr(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? "FREE" : inr(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-primary-deep pt-1 border-t border-border/60">
              <span>Total Payable</span>
              <span className="font-display text-xl text-accent">{inr(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen Actions Toolbar */}
      <div className="no-print rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-wrap items-center gap-3">
        {ACTIONS.map(([label, targetStatus]) => (
          <button
            key={targetStatus}
            type="button"
            disabled={order.status === targetStatus || order.status === "Cancelled"}
            onClick={() => setStatus(order.id, targetStatus)}
            className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-deep disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          disabled={order.status === "Cancelled" || order.status === "Delivered"}
          onClick={() => {
            if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
              setStatus(order.id, "Cancelled");
            }
          }}
          className="rounded-full border border-destructive/40 bg-destructive/10 px-5 py-2.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-white transition-colors disabled:opacity-40"
        >
          Cancel Order
        </button>

        <button
          type="button"
          onClick={() => setShowWhatsAppModal(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors ml-auto shadow-xs"
        >
          <MessageCircle className="h-4 w-4" /> Send WhatsApp Template
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-5 py-2.5 text-xs font-bold text-foreground hover:bg-gold/30 transition-colors"
        >
          <Printer className="h-4 w-4" /> Print Thermal Slip
        </button>
      </div>

      {/* WhatsApp Template Modal */}
      <WhatsAppTemplateModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        order={order}
      />
    </div>
  );
}
