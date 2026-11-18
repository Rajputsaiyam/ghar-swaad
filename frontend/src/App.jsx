import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { StoreProvider } from "./context/StoreContext";

// Customer Layout & Pages
import { SiteLayout } from "./components/common/SiteLayout";
import { Home } from "./pages/customer/Home";
import { Menu } from "./pages/customer/Menu";
import { Cart } from "./pages/customer/Cart";
import { Checkout } from "./pages/customer/Checkout";
import { OrderSuccess } from "./pages/customer/OrderSuccess";
import { TrackOrder } from "./pages/customer/TrackOrder";
import { About } from "./pages/customer/About";
import { Contact } from "./pages/customer/Contact";

// Admin Layout & Pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminOrderDetail } from "./pages/admin/AdminOrderDetail";
import { AdminMenu } from "./pages/admin/AdminMenu";
import { AdminCustomers } from "./pages/admin/AdminCustomers";
import { AdminCustomerDetail } from "./pages/admin/AdminCustomerDetail";
import { AdminWhatsApp } from "./pages/admin/AdminWhatsApp";
import { AdminOrderHistory } from "./pages/admin/AdminOrderHistory";
import { AdminSettings } from "./pages/admin/AdminSettings";

export default function App() {
  return (
    <StoreProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Customer Routes */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetail />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="customers/:phone" element={<AdminCustomerDetail />} />
            <Route path="whatsapp" element={<AdminWhatsApp />} />
            <Route path="order-history" element={<AdminOrderHistory />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
