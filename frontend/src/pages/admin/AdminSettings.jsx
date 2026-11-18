import React, { useState } from "react";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { Switch } from "../../components/ui/Switch";

const FIELDS = [
  ["businessName", "Kitchen & Brand Name", "text"],
  ["phone", "Primary Phone", "text"],
  ["whatsapp", "WhatsApp Number (with country code e.g. 91...)", "text"],
  ["email", "Official Email", "text"],
  ["address", "Kitchen Physical Address", "text"],
  ["hours", "Operating & Order Hours", "text"],
  ["upiId", "UPI Payment ID / VPA", "text"],
  ["deliveryFee", "Default Delivery Fee (₹)", "number"],
  ["freeDeliveryAbove", "Free Delivery Threshold (₹)", "number"],
  ["minOrder", "Minimum Order Value (₹)", "number"],
];

export function AdminSettings() {
  const { settings, saveSettings } = useStore();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings(form);
      toast.success("Kitchen settings updated successfully!");
    } catch (err) {
      toast.error("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageTitle
        title="Kitchen & Operational Settings"
        sub="Control order acceptance, delivery fees, and contact details."
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6"
      >
        {/* Toggle accepting orders */}
        <div className="flex items-center justify-between rounded-xl bg-muted/60 p-4">
          <div>
            <p className="font-bold text-sm text-foreground">Accepting Customer Orders</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Turn off during kitchen closing hours or when order capacity is full.
            </p>
          </div>
          <Switch
            checked={form.acceptingOrders}
            onCheckedChange={(val) => setForm({ ...form, acceptingOrders: val })}
          />
        </div>

        {/* Form fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map(([key, label, type]) => (
            <div key={key}>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                {label}
              </label>
              <input
                type={type}
                required
                value={form[key] ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-8 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary-deep transition-all disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
