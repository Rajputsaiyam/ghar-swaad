import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { fmtDate, inr } from "../../utils/formatters";
import { customersFrom, useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";

export function AdminCustomers() {
  const { orders } = useStore();
  const [query, setQuery] = useState("");

  const allCustomers = customersFrom(orders);
  const filtered = allCustomers.filter((entry) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.customer?.name?.toLowerCase().includes(q) ||
      entry.customer?.phone?.includes(q) ||
      entry.customer?.companyName?.toLowerCase().includes(q) ||
      entry.customer?.address?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          title="Customer CRM & Accounts"
          sub="Sorted by total lifetime spend — identify your most loyal regular office customers."
        />
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by customer name, phone, company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-input bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-xs overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-muted/70 text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              {["Customer", "Mobile", "WhatsApp", "Delivery Type", "Orders", "Total Spent", "Last Order"].map(
                (h) => (
                  <th key={h} className="px-4 py-3.5 font-bold">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(({ customer: c, orders: os, spent, last }) => (
              <tr key={c.phone} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-bold">
                  <Link
                    to={`/admin/customers/${c.phone}`}
                    className="text-primary hover:underline hover:text-primary-deep"
                  >
                    {c.name}
                  </Link>
                  {c.companyName && (
                    <p className="text-xs font-normal text-muted-foreground">{c.companyName}</p>
                  )}
                </td>
                <td className="px-4 py-3.5 font-mono text-xs">{c.phone}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                  {c.whatsapp || c.phone}
                </td>
                <td className="px-4 py-3.5 text-xs">
                  <span className="rounded-md bg-secondary px-2 py-0.5 font-semibold text-secondary-foreground">
                    {c.deliveryType}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-bold">{os.length}</td>
                <td className="px-4 py-3.5 font-display font-bold text-accent">{inr(spent)}</td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground">{fmtDate(last)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
