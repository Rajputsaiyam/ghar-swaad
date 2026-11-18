import React, { useState } from "react";
import { Search } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { OrdersTable } from "../../components/common/OrdersTable";

export function AdminOrderHistory() {
  const { orders } = useStore();
  const [query, setQuery] = useState("");

  const historyOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );

  const filtered = historyOrders.filter((o) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q) ||
      o.customer?.phone?.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          title="Completed & Cancelled Orders Archive"
          sub={`${historyOrders.length} historical delivery records archived.`}
        />
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search archived order ID, customer, phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-input bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs"
        />
      </div>

      <OrdersTable orders={filtered} editable={false} />
    </div>
  );
}
