import React, { useState } from "react";
import { Search } from "lucide-react";
import { STATUSES, cn } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { OrdersTable } from "../../components/common/OrdersTable";

export function AdminOrders() {
  const { orders } = useStore();
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === "All" || o.status === filterStatus;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      o.id.toLowerCase().includes(query) ||
      o.customer?.name?.toLowerCase().includes(query) ||
      o.customer?.phone?.includes(query) ||
      o.customer?.companyName?.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          title="Live Kitchen Orders"
          sub={`${orders.length} total orders recorded. Change status in real-time.`}
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs",
                filterStatus === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search order ID, name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-input bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={filteredOrders} editable={true} />
    </div>
  );
}
