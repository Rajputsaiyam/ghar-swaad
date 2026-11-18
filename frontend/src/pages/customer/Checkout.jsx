import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { inr, cn } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";

export function Checkout() {
  const { cart, totals, placeOrder, settings } = useStore();
  const navigate = useNavigate();
  const { subtotal, deliveryFee, total, count } = totals();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    address: "",
    landmark: "",
    deliveryType: "Office",
    companyName: "",
  });

  const [payment, setPayment] = useState("Cash on Delivery");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link
          to="/menu"
          className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number.";
    }
    if (form.whatsapp.trim() && !phoneRegex.test(form.whatsapp.trim())) {
      errs.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      errs.address = "Please enter complete delivery address.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!settings.acceptingOrders) {
      toast.error("Sorry, GharSwaad is currently closed and not accepting orders.");
      return;
    }

    if (!validate()) {
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      const order = await placeOrder(
        {
          ...form,
          whatsapp: form.whatsapp.trim() || form.phone.trim(),
        },
        payment
      );

      toast.success("Order placed successfully!");
      navigate(`/order-success?id=${order.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageTitle
        eyebrow="Almost Done"
        title="Delivery & Payment Details"
        sub="Tell us where to bring your fresh homemade meal."
      />

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Customer info card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <h2 className="font-display text-xl font-bold text-primary-deep">
              1. Customer Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={cn(
                    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.name && "border-destructive"
                  )}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit phone number"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                  className={cn(
                    "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.phone && "border-destructive"
                  )}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                WhatsApp Number (Optional, for order live updates)
              </label>
              <input
                type="tel"
                maxLength={10}
                placeholder="Leave blank if same as mobile"
                value={form.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value.replace(/\D/g, ""))}
                className={cn(
                  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  errors.whatsapp && "border-destructive"
                )}
              />
              {errors.whatsapp && (
                <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>
              )}
            </div>
          </div>

          {/* Delivery destination card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
            <h2 className="font-display text-xl font-bold text-primary-deep">
              2. Delivery Address
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Delivering To *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Office", "Home", "Small Industry/Workplace"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateField("deliveryType", t)}
                    className={cn(
                      "rounded-xl border py-2.5 text-xs font-bold transition-all",
                      form.deliveryType === t
                        ? "border-primary bg-primary/10 text-primary shadow-xs"
                        : "border-border text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {form.deliveryType !== "Home" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech Solutions, 3rd Floor"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Complete Address (Flat/Office No., Building, Sector/Street) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Office 402, 4th Floor, Tower B, Logix Technova, Sector 132"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className={cn(
                  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  errors.address && "border-destructive"
                )}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-destructive">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Nearest Landmark
              </label>
              <input
                type="text"
                placeholder="e.g. Opposite Park, Behind Metro Station"
                value={form.landmark}
                onChange={(e) => updateField("landmark", e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Payment selection card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <h2 className="font-display text-xl font-bold text-primary-deep">
              3. Payment Option
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all",
                  payment === "Cash on Delivery"
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border hover:bg-muted/40"
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "Cash on Delivery"}
                  onChange={() => setPayment("Cash on Delivery")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="font-bold text-sm text-foreground">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pay with cash directly to the delivery partner when your food arrives.
                  </p>
                </div>
              </label>

              <label
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all",
                  payment === "UPI"
                    ? "border-primary bg-primary/5 shadow-xs"
                    : "border-border hover:bg-muted/40"
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "UPI"}
                  onChange={() => setPayment("UPI")}
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="font-bold text-sm text-foreground">UPI / Online</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scan delivery partner's UPI QR code or pay to {settings.upiId} upon delivery.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sticky top-24 space-y-5">
            <h3 className="font-display text-lg font-bold text-primary-deep">
              Review & Place Order
            </h3>

            <div className="max-h-52 overflow-y-auto divide-y divide-border/60 text-xs">
              {cart.map((line) => (
                <div key={line.key} className="py-2.5 flex justify-between">
                  <div>
                    <span className="font-semibold text-foreground">
                      {line.qty} × {line.name}
                    </span>
                    {line.variant && (
                      <span className="text-muted-foreground ml-1">({line.variant})</span>
                    )}
                  </div>
                  <span className="font-bold text-accent">{inr(line.price * line.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({count} items)</span>
                <span>{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : inr(deliveryFee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="font-bold text-base text-primary-deep">Total Amount</span>
                <span className="font-display text-2xl font-extrabold text-accent">
                  {inr(total)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-accent py-3.5 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : `Confirm Order · ${inr(total)}`}
            </button>

            <p className="text-[11px] text-muted-foreground text-center">
              By confirming, you agree to receive live delivery status updates via WhatsApp.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
