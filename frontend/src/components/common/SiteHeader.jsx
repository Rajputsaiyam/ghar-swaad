import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { Logo } from "./Logo";
import { cn } from "../../utils/formatters";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/track", label: "Track Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { totals } = useStore();
  const [open, setOpen] = useState(false);
  const count = totals().count;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary-deep transition-all hover:bg-gold/40 hover:scale-105"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground shadow-xs animate-bounce">
                {count}
              </span>
            )}
          </Link>

          <Link
            to="/menu"
            className="hidden rounded-full bg-accent px-5 py-2 text-sm font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90 hover:scale-[1.02] sm:inline-flex"
          >
            Order Now
          </Link>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-secondary md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden space-y-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block py-2 text-base font-semibold transition-colors",
                  isActive ? "text-primary font-bold pl-2 border-l-2 border-primary" : "text-foreground"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/menu"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-xl bg-accent py-2.5 font-bold text-accent-foreground shadow-soft"
            >
              Order Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
