import React from "react";
import { Link } from "react-router-dom";
import { heroImage } from "../../utils/formatters";
import { PageTitle } from "../../components/common/PageTitle";

export function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <PageTitle
            eyebrow="Our Story"
            title="Ghar Ka Swaad, Har Din"
            sub="Honest, homemade food for hardworking people who spend their days away from home."
          />

          <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
            <p>
              GharSwaad started in a humble home kitchen with one sincere mission: professionals, workshop artisans, and families working away from home deserve food that feels like home — pure, honest, and affordable.
            </p>
            <p>
              Every morning we prepare our menu from scratch using fresh market produce, measured ground spices, cold-pressed oils, and 100% whole-wheat tawa phulkas made by hand. No heavy restaurant oils, no food coloring, and no reheated leftover gravies.
            </p>
            <p>
              Today we serve dozens of offices, small factory shifts, and homes across the district. And no matter how many meals leave our kitchen, we pack every single tiffin box with the same warmth we give our own children.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/menu"
              className="inline-block rounded-full bg-accent px-8 py-3 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90"
            >
              See Today's Fresh Menu
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/25 rotate-2 -z-10" />
          <img
            src={heroImage}
            alt="GharSwaad Kitchen Thali"
            className="aspect-square w-full rounded-[2rem] object-cover shadow-soft border-4 border-card"
          />
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {[
          ["Cooked Fresh Daily", "Meals are prepared between 7:00 AM and 11:30 AM every morning. Nothing is kept overnight."],
          ["Hygiene First", "Clean kitchen surfaces, stainless steel cookware, hairnets, gloves, and tight spill-proof packaging."],
          ["Fair Everyday Prices", "Complete balanced thalis starting at ₹70 — thoughtfully budgeted for daily office lunches."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <h3 className="font-display text-xl font-bold text-primary-deep">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
