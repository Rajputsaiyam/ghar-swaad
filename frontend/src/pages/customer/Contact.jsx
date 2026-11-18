import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { waLink } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";

export function Contact() {
  const { settings } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please enter your name, 10-digit mobile number, and inquiry message.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Our kitchen team has received your message and will call you soon.");
      setForm({ name: "", phone: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageTitle
        eyebrow="We're Here To Help"
        title="Contact GharSwaad"
        sub="Inquire for monthly office tiffin subscriptions, team event catering, or delivery feedback."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {/* Contact details */}
        <div className="space-y-4">
          {[
            [Phone, "Customer Care Phone", settings.phone],
            [Mail, "Official Email", settings.email],
            [MapPin, "Central Kitchen Address", settings.address],
            [Clock, "Kitchen Timings", settings.hours],
          ].map(([Icon, label, value]) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase font-bold text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-0.5">{value}</p>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <a
              href={waLink(settings.whatsapp, "Hello GharSwaad! I would like to inquire about daily lunch tiffins.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald-600 p-4 text-base font-bold text-white shadow-soft transition-all hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" /> Chat Directly on WhatsApp
            </a>
          </div>
        </div>

        {/* Message form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-8 shadow-soft space-y-4"
        >
          <h2 className="font-display text-xl font-bold text-primary-deep">Send Us a Note</h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Priya Verma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Message or Bulk Requirement *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tell us about your team size, office location, or any specific questions..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-base font-bold text-accent-foreground shadow-soft transition-all hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
