import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import thali from "../assets/thali.jpg";
import roti from "../assets/roti.jpg";
import rice from "../assets/rice.jpg";
import snack from "../assets/snack.jpg";
import logoImg from "../assets/logo.jpg";
import brochureImg from "../assets/menu-brochure.jpg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const CATEGORIES = [
  "Combo Meals",
  "Roti Meals",
  "Rice Meals",
  "Snacks",
  "Extras",
  "Meal Plans",
];

export const STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export const IMAGES = {
  "Combo Meals": thali,
  "Roti Meals": roti,
  "Rice Meals": rice,
  "Snacks": snack,
  "Extras": roti,
  "Meal Plans": thali,
};

export const heroImage = thali;
export const logoImage = logoImg;
export const menuBrochureImage = brochureImg;

export const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export const fmtDate = (s) => {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return s;
  }
};

export const waLink = (phone, text) => {
  const p = phone || "9354429850";
  const clean = String(p).replace(/\D/g, "").replace(/^(?!91)(\d{10})$/, "91$1");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text || "")}`;
};

export const STATUS_STYLE = {
  Pending: "bg-amber-100 text-amber-900 border border-amber-300",
  Confirmed: "bg-blue-100 text-blue-900 border border-blue-300",
  Preparing: "bg-orange-100 text-orange-900 border border-orange-300",
  Ready: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  "Out for Delivery": "bg-purple-100 text-purple-900 border border-purple-300",
  Delivered: "bg-primary text-primary-foreground",
  Cancelled: "bg-red-100 text-red-900 border border-red-300",
};
