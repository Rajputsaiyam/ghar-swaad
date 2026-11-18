import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Building2, ShoppingBag } from "lucide-react";
import { fmtDate, inr } from "../../utils/formatters";
import { customersFrom, useStore } from "../../context/StoreContext";
import { OrdersTable } from "../../components/common/OrdersTable";

export function AdminCustomerDetail() {
  const { phone } = useParams();
  const { orders } = useStore();

  const customerRecord = customersFrom(orders).find((x) => x.customer?.phone === phone);

  if (!customerRecord) {
    return (
      <div className="py-12 space-y-3">
        <p className="text-muted-foreground">Customer profile not found.</p>
        <Link to="/admin/customers" className="text-primary font-bold hover:underline inline-block">
          ← Back to Customers
        </Link>
      </div>
    );
  }

  const { customer: c, orders: customerOrders, spent, last } = customerRecord;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/customers"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Customers
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-primary-deep">{c.name}</h1>
          <p className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <Phone className="h-3.5 w-3.5 text-accent" /> {c.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-accent" /> {c.address}
            </span>
            {c.companyName && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-accent" /> {c.companyName}
              </span>
            )}
          </p>
        </div>

        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground border border-border">
          {c.deliveryType} Delivery
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ["Total Orders", customerOrders.length, ShoppingBag],
          ["Lifetime Spent", inr(spent), null],
          ["Last Ordered", fmtDate(last).split(",")[0], null],
        ].map(([label, val]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="font-display text-2xl font-extrabold text-primary-deep mt-2">{val}</p>
          </div>
        ))}
      </div>

      {/* Customer Orders Table */}
      <div className="space-y-3 pt-2">
        <h2 className="font-display text-xl font-bold text-primary-deep">Order History</h2>
        <OrdersTable orders={customerOrders} editable={false} />
      </div>
    </div>
  );
}
