import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Wallet,
  Building2,
  Factory,
  Home as HomeIcon,
  Star,
  ArrowRight,
  MessageCircle,
  Truck,
  Clock,
  CalendarCheck,
  Check,
} from "lucide-react";
import { heroImage, logoImage, inr, waLink } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";

const FEATURES = [
  { icon: Leaf, t: "Fresh Ingredients", d: "Sourced every dawn, 100% whole-wheat rotis." },
  { icon: HeartHandshake, t: "Home-Style Taste", d: "Light on oil & spices — exactly like mom's cooking." },
  { icon: ShieldCheck, t: "Hygienic & Safe", d: "Hair caps, sterilized kitchen, sealed eco-containers." },
  { icon: Wallet, t: "Affordable & Filling", d: "Healthy balanced office meals starting at just ₹40." },
];

export function Home() {
  const { menu, settings } = useStore();
  const combos = menu.filter((m) => m.category === "Combo Meals").slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="leaf-bg border-b border-border/50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary/40 bg-white shadow-soft shrink-0">
                <img src={logoImage} alt="GharSwaad Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                  <Leaf className="h-3.5 w-3.5" /> Homemade Food, Happier Days
                </p>
                <p className="text-xs font-semibold text-accent mt-0.5">
                  Fresh Food · Desi Taste · Affordable
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary-deep md:text-5xl lg:text-6xl">
              Fresh <span className="text-accent italic font-serif">Ghar Ka Khana</span>, Ab Aapke Office Tak!
            </h1>

            <p className="mt-4 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Wholesome daily thalis, roti meals, and rice bowls prepared fresh every morning and delivered hot to offices, small factories, and nearby homes.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="rounded-full bg-accent px-8 py-3.5 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90 hover:scale-[1.02]"
              >
                Order Now
              </Link>
              <a
                href={waLink(settings.whatsapp || "9354429850", "Hello GharSwaad! I would like to order fresh lunch.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-6 py-3.5 text-base font-bold text-emerald-800 shadow-xs hover:bg-emerald-100 transition-all"
              >
                <MessageCircle className="h-5 w-5 text-emerald-700" /> WhatsApp Order
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" /> Starting at <b className="text-primary-deep font-bold">₹40</b>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-accent" /> Delivery within 2–4 km
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" /> Timely Delivery by 12:45 PM
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/30 rotate-3 transform -z-10" />
            <img
              src={heroImage}
              alt="Homemade Indian thali with dal, sabzi, roti and rice"
              className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft border-4 border-card"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur-sm">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Office Favourite
              </p>
              <p className="font-display text-xl font-bold text-accent">Classic Thali · {inr(90)}</p>
              <p className="text-[11px] text-muted-foreground">1 Sabzi, Dal, 4 Roti, Rice & Raita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Checklist Banner from Menu Brochure */}
      <section className="bg-secondary/70 border-b border-border py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-4 px-4 text-xs font-bold text-primary-deep uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> No MSG</span>
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Freshly Cooked Everyday</span>
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Hygienic Kitchen</span>
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> On-Time Delivery</span>
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-700" /> Custom Plans for Offices</span>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <I className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-primary-deep">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Combo Meals (Full Plate) */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Complete Full Plates</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-primary-deep">
              Combo Meals
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Complete meal with 1 sabzi, dal, roti, rice and salad
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:underline"
          >
            Full Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((m) => (
            <Link
              key={m.id}
              to="/menu"
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1.5 hover:shadow-soft"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {m.name}
                  </h3>
                  <span className="font-display text-xl font-extrabold text-accent">
                    {inr(m.price)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{m.portion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Monthly & Weekly Subscription Plans from Brochure */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-amber-50/60 via-card to-emerald-50/60 p-8 shadow-soft">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-primary-deep uppercase tracking-wider">
                <CalendarCheck className="h-3.5 w-3.5 text-accent" /> Monthly / Weekly Plans
              </span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-extrabold text-primary-deep">
                Subscribe & Save on Daily Office Lunch
              </h2>
              <p className="text-sm text-muted-foreground">
                Fixed menu, freshly prepared every Monday to Friday. Zero hassle, daily on-time desk delivery.
              </p>
            </div>
            <a
              href={waLink(settings.whatsapp || "9354429850", "Hello GharSwaad, I want to book a Weekly / Monthly meal plan!")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-deep"
            >
              <MessageCircle className="h-4 w-4" /> Subscribe via WhatsApp
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Weekly Plan */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                  5 Days
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  Weekly Lunch Plan
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  1 full meal per day (Fixed menu, Mon–Fri). Ideal for trying out our homestyle service.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                <div>
                  <span className="font-display text-3xl font-extrabold text-accent">₹320</span>
                  <span className="text-xs text-muted-foreground ml-1">/ 5 meals</span>
                </div>
                <Link
                  to="/menu"
                  className="rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  Order
                </Link>
              </div>
            </div>

            {/* Monthly Plan */}
            <div className="rounded-2xl border-2 border-accent bg-card p-6 shadow-soft flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Best Value
              </span>
              <div>
                <span className="rounded-lg bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
                  22 Days
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  Monthly Lunch Plan
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  1 full meal per day (Fixed menu, Mon–Fri). Never worry about lunch for the whole month!
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                <div>
                  <span className="font-display text-3xl font-extrabold text-accent">₹1,400</span>
                  <span className="text-xs text-muted-foreground ml-1">/ 22 meals</span>
                </div>
                <Link
                  to="/menu"
                  className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-accent/90 transition-colors"
                >
                  Order
                </Link>
              </div>
            </div>

            {/* Custom Office Plan */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                  10+ Team Orders
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  Corporate & Office Catering
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Special bulk rates for IT offices, factories, and workshops with custom billing and timed drops.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                <span className="font-display text-lg font-bold text-primary-deep">Special Rates</span>
                <Link
                  to="/contact"
                  className="rounded-full border border-primary px-4 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating / Bottom WhatsApp order bar */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-emerald-800 p-6 text-white shadow-soft">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-emerald-800">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Direct Kitchen Hotline
              </p>
              <h3 className="text-xl font-bold font-display">
                Order on WhatsApp: +91 93544 29850
              </h3>
              <p className="text-xs opacity-90">
                Delivery within 2–4 km · Timely Delivery · Freshly Cooked Everyday
              </p>
            </div>
          </div>

          <a
            href={waLink("9354429850", "Hello GharSwaad, I'd like to place an order!")}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-white px-8 py-3 text-sm font-bold text-emerald-900 shadow-soft transition-all hover:bg-emerald-50 hover:scale-105"
          >
            Chat Now on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
