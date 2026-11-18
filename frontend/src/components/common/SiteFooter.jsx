import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Heart, Truck } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/track", label: "Track Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const { settings } = useStore();

  return (
    <footer className="mt-20 bg-primary-deep text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed opacity-80">
            Fresh Ghar Ka Khana, Ab Aapke Office Tak! Wholesome, nutritious, and authentic homemade meals cooked daily with purity, desi taste, and care.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs text-gold font-medium">
            <Truck className="h-4 w-4 shrink-0 text-gold" /> Fast delivery within 2–4 km
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="font-display text-lg font-bold text-gold">Reach Us</h4>
          <p className="flex items-center gap-2.5 opacity-90">
            <Phone className="h-4 w-4 shrink-0 text-gold" />
            <a href={`tel:${settings.phone}`} className="hover:underline">{settings.phone}</a>
          </p>
          <p className="flex items-center gap-2.5 opacity-90">
            <Mail className="h-4 w-4 shrink-0 text-gold" />
            <a href={`mailto:${settings.email}`} className="hover:underline">{settings.email}</a>
          </p>
          <p className="flex items-start gap-2.5 opacity-90">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
            <span>{settings.address}</span>
          </p>
          <p className="flex items-center gap-2.5 opacity-90">
            <Clock className="h-4 w-4 shrink-0 text-gold" />
            <span>{settings.hours}</span>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-display text-lg font-bold text-gold">Quick Links</h4>
          <div className="flex flex-col space-y-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="pt-2 text-xs font-semibold opacity-60 transition-opacity hover:opacity-100 text-gold/80"
            >
              🔒 Kitchen Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-sidebar-border/60 py-5 text-center text-xs opacity-75">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} GharSwaad Homemade Food. Cooked with <Heart className="h-3.5 w-3.5 text-accent fill-accent inline" /> for hardworking teams.
        </p>
      </div>
    </footer>
  );
}
