import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { inr } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";

export function Cart() {
  const { cart, totals, setQty, clearCart, settings } = useStore();
  const { subtotal, deliveryFee, total, count } = totals();

  const neededForFreeDelivery = Math.max(0, settings.freeDeliveryAbove - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / settings.freeDeliveryAbove) * 100);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-secondary text-primary">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="font-display text-2xl font-bold text-primary-deep">Your Cart is Empty</h2>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added any homestyle meals yet.
        </p>
        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90"
          >
            Explore Today's Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          eyebrow="Review Your Meal"
          title={`Your Cart (${count} items)`}
          sub="Check your dishes and proceed to delivery address."
        />
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-destructive hover:underline mb-8"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart Item Lines */}
        <div className="space-y-4">
          {/* Free delivery banner */}
          <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4">
            {neededForFreeDelivery > 0 ? (
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-gold fill-gold" />
                  Add <b className="text-primary-deep">{inr(neededForFreeDelivery)}</b> more to unlock{" "}
                  <b className="text-primary-deep">FREE Delivery</b>!
                </p>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-sm font-bold text-primary">
                🎉 Congratulations! You have unlocked FREE Delivery!
              </p>
            )}
          </div>

          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-xs">
            {cart.map((line) => (
              <div
                key={line.key}
                className="flex flex-wrap items-center justify-between gap-4 p-5 sm:flex-nowrap"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-foreground">
                    {line.name} {line.variant && <span className="text-xs font-normal text-muted-foreground">({line.variant})</span>}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{line.portion}</p>
                  <p className="mt-1 font-display font-bold text-accent sm:hidden">
                    {inr(line.price * line.qty)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-border bg-muted/40">
                    <button
                      type="button"
                      onClick={() => setQty(line.key, line.qty - 1)}
                      className="grid h-8 w-8 place-items-center text-foreground hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-sm">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.key, line.qty + 1)}
                      className="grid h-8 w-8 place-items-center text-foreground hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="hidden font-display font-bold text-accent sm:inline-block w-20 text-right">
                    {inr(line.price * line.qty)}
                  </span>

                  <button
                    onClick={() => setQty(line.key, 0)}
                    className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-destructive transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/menu"
              className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              ← Add more items from menu
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sticky top-24 space-y-4">
            <h2 className="font-display text-xl font-bold text-primary-deep">Order Summary</h2>

            <div className="space-y-2.5 text-sm pt-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({count} items)</span>
                <span className="font-semibold text-foreground">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="font-semibold text-foreground">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    inr(deliveryFee)
                  )}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="font-bold text-base text-primary-deep">To Pay</span>
                <span className="font-display text-2xl font-extrabold text-accent">
                  {inr(total)}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90 hover:scale-[1.02]"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="text-[11px] text-muted-foreground text-center space-y-1 pt-2">
              <p>Safe packaging · Hot delivery</p>
              <p>UPI and Cash on Delivery accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
