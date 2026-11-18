import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { inr, waLink } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const { orders, settings } = useStore();

  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-primary shadow-soft animate-pulse">
        <CheckCircle2 className="h-12 w-12" />
      </div>

      <h1 className="font-display text-3xl font-extrabold text-primary-deep md:text-4xl">
        Order Received!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Thank you! Our kitchen has received your order and is preparing to cook your meal fresh.
      </p>

      {/* Order Badge Card */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft text-left space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
              Order ID
            </p>
            <p className="font-display text-xl font-extrabold text-accent">{orderId || "Pending"}</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200">
            Order Received
          </span>
        </div>

        {order && (
          <>
            <div className="space-y-1.5 text-xs text-muted-foreground border-b border-border pb-3">
              <p className="font-semibold text-foreground text-sm">{order.customer?.name}</p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                {order.customer?.address}
              </p>
              <p>Phone: {order.customer?.phone}</p>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground border-b border-border pb-3">
              {order.items?.map((item) => (
                <div key={item.key} className="flex justify-between">
                  <span>
                    {item.qty} × {item.name}
                  </span>
                  <span className="font-semibold text-foreground">{inr(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-base text-primary-deep pt-1">
              <span>Total Payable ({order.payment})</span>
              <span className="font-display text-xl text-accent">{inr(order.total)}</span>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
        {order && (
          <Link
            to={`/track?id=${order.id}&phone=${order.customer?.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:bg-primary-deep hover:scale-[1.02]"
          >
            Track Live Status <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <a
          href={waLink(
            settings.whatsapp,
            `Hello GharSwaad, I have placed order ${orderId}. Please confirm kitchen status!`
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-emerald-700"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Kitchen
        </a>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-xs font-semibold text-muted-foreground hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
