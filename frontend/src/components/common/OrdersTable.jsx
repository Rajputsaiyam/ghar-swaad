import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, MessageCircle, Printer } from "lucide-react";
import { STATUSES, fmtDate, inr } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { StatusBadge } from "./StatusBadge";
import { WhatsAppTemplateModal } from "../admin/WhatsAppTemplateModal";

export function OrdersTable({ orders, editable = true }) {
  const { setStatus } = useStore();
  const [selectedOrderForWhatsApp, setSelectedOrderForWhatsApp] = useState(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
        <p className="text-base font-semibold">No orders found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-muted/70 text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              {["Order ID", "Customer", "Phone", "Items", "Amount", "Payment", "Delivery", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3.5 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id} className="align-middle transition-colors hover:bg-muted/30">
                <td className="px-4 py-3.5 font-bold">
                  <Link
                    to={`/admin/orders/${o.id}`}
                    className="text-primary hover:underline hover:text-primary-deep"
                  >
                    {o.id}
                  </Link>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-foreground">{o.customer?.name}</p>
                  {o.customer?.companyName && (
                    <p className="text-xs text-muted-foreground">{o.customer.companyName}</p>
                  )}
                </td>
                <td className="px-4 py-3.5 font-mono text-xs">{o.customer?.phone}</td>
                <td className="max-w-56 px-4 py-3.5 text-xs text-muted-foreground truncate">
                  {o.items?.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                </td>
                <td className="px-4 py-3.5 font-display font-bold text-accent">
                  {inr(o.total)}
                </td>
                <td className="px-4 py-3.5 text-xs">
                  <span className="rounded-md bg-secondary px-2 py-1 font-semibold text-secondary-foreground">
                    {o.payment}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-xs">
                  <span className="font-medium text-foreground">{o.customer?.deliveryType}</span>
                </td>
                <td className="px-4 py-3.5">
                  {editable ? (
                    <select
                      value={o.status}
                      onChange={(e) => setStatus(o.id, e.target.value)}
                      className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge status={o.status} />
                  )}
                </td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                  {fmtDate(o.createdAt)}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary-deep hover:bg-gold/30 transition-colors"
                      title="View Order"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedOrderForWhatsApp(o)}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                      title="Send WhatsApp Template"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <Link
                      to={`/admin/orders/${o.id}?print=true`}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
                      title="Print Receipt"
                    >
                      <Printer className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WhatsApp Template Modal */}
      <WhatsAppTemplateModal
        isOpen={!!selectedOrderForWhatsApp}
        onClose={() => setSelectedOrderForWhatsApp(null)}
        order={selectedOrderForWhatsApp}
      />
    </>
  );
}
