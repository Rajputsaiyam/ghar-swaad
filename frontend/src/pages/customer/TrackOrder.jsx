import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Circle, XCircle, Search } from "lucide-react";
import { STATUSES, fmtDate, inr, cn } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { StatusBadge } from "../../components/common/StatusBadge";

const FLOW = STATUSES.filter((s) => s !== "Cancelled");
const LABEL = {
  Pending: "Order Received",
  Confirmed: "Confirmed by Kitchen",
  Preparing: "Cooking Fresh",
  Ready: "Packed & Sealed",
  "Out for Delivery": "Out for Delivery",
  Delivered: "Delivered Hot",
};

export function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orders, ready } = useStore();

  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  const findOrder = () => {
    if (!orderId.trim() || !phone.trim()) return;

    setSearched(true);
    const cleanId = orderId.trim().toLowerCase();
    const cleanPhone = phone.trim();

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanId &&
        (o.customer?.phone === cleanPhone || o.customer?.whatsapp === cleanPhone)
    );

    setResult(match || null);
    setSearchParams({ id: orderId.trim(), phone: phone.trim() });
  };

  useEffect(() => {
    if (ready && orderId && phone) {
      findOrder();
    }
  }, [ready]);

  const activeIndex = result ? FLOW.indexOf(result.status) : -1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <PageTitle
        eyebrow="Real-Time Updates"
        title="Track Your Order"
        sub="Enter the Order ID and mobile number you used while placing the order."
      />

      {/* Lookup Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          findOrder();
        }}
        className="rounded-2xl border border-border bg-card p-5 shadow-xs grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input
          type="text"
          required
          placeholder="Order ID (e.g. GS-20260925-001)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />

        <input
          type="tel"
          required
          maxLength={10}
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-xs hover:bg-primary-deep transition-all"
        >
          <Search className="h-4 w-4" /> Track
        </button>
      </form>

      {/* Not found state */}
      {searched && result === null && (
        <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center text-destructive">
          <p className="font-bold text-base">No Order Found</p>
          <p className="mt-1 text-sm text-foreground/80">
            Please verify your Order ID and 10-digit mobile number.
          </p>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="font-display text-2xl font-extrabold text-primary-deep">{result.id}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Placed on {fmtDate(result.createdAt)} · {result.payment} · {inr(result.total)}
              </p>
            </div>
            <StatusBadge status={result.status} />
          </div>

          {result.status === "Cancelled" ? (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-destructive border border-red-200">
              <XCircle className="h-6 w-6 shrink-0" />
              <div>
                <p className="font-bold">This order was cancelled.</p>
                <p className="text-xs text-muted-foreground">
                  Please reach out to our kitchen on WhatsApp if you need assistance.
                </p>
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <ol className="relative ml-2 space-y-7">
                {FLOW.map((s, i) => {
                  const isDone = i < activeIndex || (i === activeIndex && s === "Delivered");
                  const isCurrent = i === activeIndex && !isDone;

                  return (
                    <li key={s} className="relative flex gap-4">
                      {i < FLOW.length - 1 && (
                        <span
                          className={cn(
                            "absolute left-[15px] top-8 h-full w-0.5 -ml-[1px]",
                            i < activeIndex ? "bg-primary" : "bg-border"
                          )}
                        />
                      )}

                      <span
                        className={cn(
                          "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all",
                          isDone
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : isCurrent
                            ? "bg-orange text-white shadow-soft ring-4 ring-orange/20 animate-pulse"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isDone ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Circle className={cn("h-3 w-3", isCurrent && "fill-current")} />
                        )}
                      </span>

                      <div className="pt-0.5">
                        <p
                          className={cn(
                            "text-sm font-bold",
                            isDone || isCurrent ? "text-primary-deep" : "text-muted-foreground"
                          )}
                        >
                          {LABEL[s] || s}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isDone
                            ? "Completed"
                            : isCurrent
                            ? "Currently in progress"
                            : "Upcoming step"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Delivery destination summary */}
          <div className="rounded-xl bg-muted/50 p-4 text-xs space-y-1 text-muted-foreground">
            <p className="font-semibold text-foreground">
              Delivering To: {result.customer?.name} ({result.customer?.deliveryType})
            </p>
            <p>{result.customer?.address}</p>
            {result.customer?.landmark && <p>Landmark: {result.customer.landmark}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
