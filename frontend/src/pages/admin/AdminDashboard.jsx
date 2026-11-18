import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ClipboardList, IndianRupee, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { inr } from "../../utils/formatters";
import { useStore } from "../../context/StoreContext";
import { PageTitle } from "../../components/common/PageTitle";
import { StatusBadge } from "../../components/common/StatusBadge";

const sameDay = (a, b) => a.toDateString() === b.toDateString();

export function AdminDashboard() {
  const { orders } = useStore();
  const now = new Date();

  const valid = orders.filter((o) => o.status !== "Cancelled");
  const todayOrders = orders.filter((o) => sameDay(new Date(o.createdAt), now));

  const calcRevenueDays = (days) =>
    valid
      .filter((o) => (now.getTime() - new Date(o.createdAt).getTime()) / 864e5 < days)
      .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const todayRevenue = todayOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const stats = [
    { label: "Today's Orders", val: todayOrders.length, icon: ClipboardList, color: "text-accent" },
    { label: "Today's Revenue", val: inr(todayRevenue), icon: IndianRupee, color: "text-emerald-700" },
    {
      label: "Pending Orders",
      val: orders.filter((o) => o.status === "Pending").length,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Delivered Orders",
      val: orders.filter((o) => o.status === "Delivered").length,
      icon: CheckCircle2,
      color: "text-primary",
    },
  ];

  const chartKeys = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
  const colors = ["#E5A93C", "#E06D28", "#9333ea", "#2D5A27", "#D32F2F"];
  const chartData = chartKeys.map((k) => ({
    name: k,
    count: orders.filter((o) => o.status === k).length,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PageTitle
          title="Kitchen Operations Dashboard"
          sub={now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, val, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="mt-3 font-display text-2xl md:text-3xl font-extrabold text-primary-deep">
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid: Today's Orders & Chart/Revenue */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Today's Orders list */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-primary-deep">
              Today's Orders ({todayOrders.length})
            </h2>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              All Orders <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {todayOrders.length === 0 ? (
            <div className="my-auto py-12 text-center text-muted-foreground">
              <p>No orders placed yet today.</p>
            </div>
          ) : (
            <div className="divide-y divide-border overflow-y-auto max-h-[460px]">
              {todayOrders.map((o) => (
                <Link
                  key={o.id}
                  to={`/admin/orders/${o.id}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3.5 transition-colors hover:bg-muted/40 px-2 rounded-xl"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">
                      {o.id} · {o.customer?.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      {o.items?.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-accent">{inr(o.total)}</span>
                    <StatusBadge status={o.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Revenue Breakdown & Status Distribution */}
        <div className="space-y-6">
          {/* Revenue Breakdown */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h2 className="font-display text-xl font-bold text-primary-deep mb-4">
              Revenue Snapshot
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["Today", todayRevenue],
                ["Last 7 Days", calcRevenueDays(7)],
                ["Last 30 Days", calcRevenueDays(30)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted/60 p-3">
                  <p className="text-[11px] font-semibold text-muted-foreground">{k}</p>
                  <p className="font-display text-base font-bold text-primary-deep mt-1">
                    {inr(v)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Status Breakdown Chart */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h2 className="font-display text-xl font-bold text-primary-deep mb-3">
              Order Status Pipeline
            </h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E5DC" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={colors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
