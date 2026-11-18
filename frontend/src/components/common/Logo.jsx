import React from "react";
import { Link } from "react-router-dom";
import { logoImage, cn } from "../../utils/formatters";

export function Logo({ light = false, size = "md" }) {
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  }[size] || "h-11 w-11";

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div
        className={cn(
          "relative overflow-hidden rounded-full border-2 shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0 bg-white",
          sizeClasses,
          light ? "border-gold/60" : "border-primary/30"
        )}
      >
        <img
          src={logoImage}
          alt="GharSwaad Logo"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="leading-tight">
        <span
          className={cn(
            "block font-display text-xl font-extrabold tracking-tight",
            light ? "text-sidebar-foreground" : "text-primary-deep"
          )}
        >
          Ghar<span className="text-orange">Swaad</span>
        </span>
        <span
          className={cn(
            "block text-[9px] font-bold tracking-[0.18em] uppercase",
            light ? "text-sidebar-foreground/75" : "text-accent"
          )}
        >
          Homemade Food, Happier Days
        </span>
      </div>
    </Link>
  );
}
