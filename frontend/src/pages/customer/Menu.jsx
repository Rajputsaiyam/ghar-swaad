import React, { useState } from "react";
import { Minus, Plus, ShoppingBag, Eye, X, FileText } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, inr, cn, menuBrochureImage } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";

export function Menu() {
  const { menu } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBrochure, setShowBrochure] = useState(false);

  const categoriesToDisplay =
    selectedCategory === "All" ? CATEGORIES : [selectedCategory];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          eyebrow="Fresh Every Morning"
          title="Our Homemade Menu"
          sub="Every dish is prepared using fresh ingredients with zero preservatives. Portion weights and details are clearly shown below."
        />

        <button
          onClick={() => setShowBrochure(true)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary px-5 py-2.5 text-xs font-bold text-primary-deep shadow-xs hover:bg-gold/30 transition-all mb-4 sm:mb-0"
        >
          <FileText className="h-4 w-4 text-accent" /> View Original Menu Flyer
        </button>
      </div>

      {/* Category selector pills */}
      <div className="sticky top-[65px] z-30 -mx-4 mb-10 flex gap-2 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur-md border-b border-border/40">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-all shadow-xs",
              selectedCategory === c
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-gold/30"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Menu Categories */}
      {categoriesToDisplay.map((c) => {
        const items = menu.filter((m) => m.category === c);
        if (!items.length) return null;

        return (
          <section key={c} className="mb-14">
            <h2 className="mb-6 flex items-center gap-4 font-display text-2xl font-extrabold text-primary-deep">
              {c} <span className="h-px flex-1 bg-border" />
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Menu Brochure Modal */}
      {showBrochure && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 p-4 backdrop-blur-sm"
          onClick={() => setShowBrochure(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl bg-card p-3 shadow-soft border border-border"
          >
            <button
              onClick={() => setShowBrochure(false)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-foreground/80 text-white shadow-md hover:bg-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={menuBrochureImage}
              alt="GharSwaad Official Menu Flyer"
              className="w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItemCard({ item }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState("Full");

  const price = variant === "Half" && item.halfPrice ? item.halfPrice : item.price;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all hover:shadow-soft",
        !item.available && "opacity-60"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 grid place-items-center bg-foreground/60 font-bold text-white text-sm">
            Currently Unavailable
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-foreground leading-snug">{item.name}</h3>
          <span className="shrink-0 font-display text-xl font-extrabold text-accent">
            {inr(price)}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>

        <div className="mt-3">
          <span className="inline-block rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-primary-deep">
            {item.portion}
          </span>
        </div>

        {/* Portion variant toggle */}
        {item.halfPrice && (
          <div className="mt-4 flex gap-2">
            {["Full", "Half"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={cn(
                  "flex-1 rounded-lg border py-1.5 text-xs font-bold transition-all",
                  variant === v
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {v} · {inr(v === "Half" ? item.halfPrice : item.price)}
              </button>
            ))}
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="mt-auto flex items-center gap-3 pt-5">
          <div className="flex items-center rounded-full border border-border bg-muted/40">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center text-foreground hover:text-primary transition-colors disabled:opacity-30"
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center font-bold text-sm">{qty}</span>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center text-foreground hover:text-primary transition-colors"
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={!item.available}
            onClick={() => {
              addToCart(item, qty, item.halfPrice ? variant : undefined);
              toast.success(`${qty} × ${item.name} added to cart`);
              setQty(1);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            {item.available ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </article>
  );
}
