import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, IMAGES, inr } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { Switch } from "../../components/ui/Switch";

const blankItem = () => ({
  id: `m${Date.now()}`,
  name: "",
  category: "Combo Meals",
  description: "",
  price: 70,
  halfPrice: "",
  portion: "",
  ingredients: [],
  image: IMAGES["Combo Meals"],
  available: true,
});

export function AdminMenu() {
  const { menu, saveMenuItem, deleteMenuItem } = useStore();
  const [editingItem, setEditingItem] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          title="Menu Management"
          sub={`${menu.length} active menu items across ${CATEGORIES.length} categories.`}
        />

        <button
          onClick={() => setEditingItem(blankItem())}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary-deep transition-all"
        >
          <Plus className="h-4 w-4" /> Add New Item
        </button>
      </div>

      {CATEGORIES.map((cat) => {
        const items = menu.filter((m) => m.category === cat);
        return (
          <section key={cat} className="space-y-3">
            <h2 className="font-display text-xl font-bold text-primary-deep flex items-center justify-between">
              <span>{cat}</span>
              <span className="text-xs font-normal text-muted-foreground">{items.length} dishes</span>
            </h2>

            <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden shadow-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-4 p-4 transition-colors hover:bg-muted/30"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-xl object-cover border border-border"
                  />

                  <div className="min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {inr(item.price)}
                      {item.halfPrice ? ` / Half ${inr(item.halfPrice)}` : ""} · {item.portion}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5" title="Toggle availability">
                      <span className="text-[11px] font-semibold text-muted-foreground hidden sm:inline">
                        {item.available ? "Available" : "Sold Out"}
                      </span>
                      <Switch
                        checked={item.available}
                        onCheckedChange={(val) => saveMenuItem({ ...item, available: val })}
                      />
                    </div>

                    <button
                      onClick={() => setEditingItem(item)}
                      className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary hover:bg-gold/30 transition-colors"
                      title="Edit dish"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
                          deleteMenuItem(item.id);
                          toast.success("Item removed from menu");
                        }
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-destructive transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Editor Modal */}
      {editingItem && (
        <MenuModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(itemToSave) => {
            saveMenuItem(itemToSave);
            setEditingItem(null);
            toast.success("Menu item saved successfully!");
          }}
        />
      )}
    </div>
  );
}

function MenuModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    ...item,
    ingredientsStr: Array.isArray(item.ingredients) ? item.ingredients.join(", ") : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || Number(formData.price) <= 0) {
      toast.error("Dish name and positive price are required");
      return;
    }

    onSave({
      ...formData,
      price: Number(formData.price),
      halfPrice: formData.halfPrice ? Number(formData.halfPrice) : undefined,
      ingredients: formData.ingredientsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-display text-xl font-bold text-primary-deep">
            {item.name ? "Edit Menu Item" : "Add New Dish"}
          </h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Dish Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
                image: IMAGES[e.target.value] || formData.image,
              })
            }
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Full Price (₹) *
            </label>
            <input
              type="number"
              required
              min={1}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Half Price (₹, optional)
            </label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 40"
              value={formData.halfPrice || ""}
              onChange={(e) => setFormData({ ...formData, halfPrice: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Portion Specification *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 2 Sabzi 150g · Dal 150ml · 4 Roti · Rice 200g"
            value={formData.portion}
            onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Ingredients (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Paneer, Dal, Atta, Basmati Rice"
            value={formData.ingredientsStr}
            onChange={(e) => setFormData({ ...formData, ingredientsStr: e.target.value })}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-5 py-2 text-xs font-bold text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary-deep"
          >
            Save Dish
          </button>
        </div>
      </form>
    </div>
  );
}
