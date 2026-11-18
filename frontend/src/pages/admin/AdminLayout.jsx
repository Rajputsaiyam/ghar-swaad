import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Users,
  MessageCircle,
  History,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { Logo } from "../../components/common/Logo";
import { cn } from "../../utils/formatters";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Live Orders", icon: ClipboardList },
  { to: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
  { to: "/admin/customers", label: "Customers CRM", icon: Users },
  { to: "/admin/whatsapp", label: "WhatsApp Desk", icon: MessageCircle },
  { to: "/admin/order-history", label: "Order History", icon: History },
  { to: "/admin/settings", label: "Kitchen Settings", icon: Settings },
];

export function AdminLayout() {
  const { admin, ready, logout, orders } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !admin) {
      navigate("/admin/login", { replace: true });
    }
  }, [ready, admin, navigate]);

  if (!ready || !admin) {
    return null;
  }

  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="no-print bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-between border-r border-sidebar-border">
        <div>
          <div className="p-5 border-b border-sidebar-border/40">
            <Logo light />
          </div>

          <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-x-visible">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-xs font-bold"
                      : "opacity-80 hover:bg-sidebar-accent hover:opacity-100"
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {to === "/admin/orders" && pendingCount > 0 && (
                  <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="p-3 border-t border-sidebar-border/40 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium opacity-75 hover:opacity-100 hover:bg-sidebar-accent transition-colors"
          >
            <ExternalLink className="h-4 w-4" /> View Customer Site
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login", { replace: true });
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-red-300 opacity-75 hover:opacity-100 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="min-w-0 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
