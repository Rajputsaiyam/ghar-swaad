import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { INITIAL_MENU, INITIAL_SETTINGS, buildInitialOrders } from "../utils/seedData";
import { menuApi, orderApi, settingApi, authApi } from "../services/api";

const StoreContext = createContext(null);
const STORAGE_KEY = "gharswaad_state_v5";

export function StoreProvider({ children }) {
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [admin, setAdmin] = useState(false);
  const [ready, setReady] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  // Initialize from localStorage first
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const token = localStorage.getItem("gharswaad_token");
      if (token) setAdmin(true);

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.menu && parsed.menu.length) setMenu(parsed.menu);
        else setMenu(INITIAL_MENU);
        if (parsed.orders && parsed.orders.length) setOrders(parsed.orders);
        else setOrders(buildInitialOrders(new Date()));
        if (parsed.cart) setCart(parsed.cart);
        if (parsed.settings) setSettings({ ...INITIAL_SETTINGS, ...parsed.settings });
        else setSettings(INITIAL_SETTINGS);
        if (parsed.admin !== undefined) setAdmin(parsed.admin);
      } else {
        setMenu(INITIAL_MENU);
        setOrders(buildInitialOrders(new Date()));
        setSettings(INITIAL_SETTINGS);
      }
    } catch (err) {
      console.warn("Storage parse error, using seed data:", err);
      setMenu(INITIAL_MENU);
      setOrders(buildInitialOrders(new Date()));
      setSettings(INITIAL_SETTINGS);
    }
    setReady(true);
  }, []);

  // Sync with backend API if running
  useEffect(() => {
    const syncBackend = async () => {
      try {
        const [menuRes, ordersRes, settingsRes] = await Promise.allSettled([
          menuApi.getAll(),
          orderApi.getAll(),
          settingApi.get(),
        ]);

        let connected = false;

        if (menuRes.status === "fulfilled" && menuRes.value.data?.data) {
          setMenu(menuRes.value.data.data);
          connected = true;
        }

        if (ordersRes.status === "fulfilled" && ordersRes.value.data?.data) {
          setOrders(ordersRes.value.data.data);
          connected = true;
        }

        if (settingsRes.status === "fulfilled" && settingsRes.value.data?.data) {
          setSettings(settingsRes.value.data.data);
          connected = true;
        }

        setBackendConnected(connected);
      } catch (err) {
        console.log("Backend offline, running in client-resilient mode.");
        setBackendConnected(false);
      }
    };

    if (ready) {
      syncBackend();
    }
  }, [ready]);

  // Persist locally for offline / fast reload
  useEffect(() => {
    if (ready) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ menu, orders, cart, settings, admin })
      );
    }
  }, [menu, orders, cart, settings, admin, ready]);

  const value = useMemo(() => {
    const totals = () => {
      const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
      const deliveryFee =
        subtotal === 0 || subtotal >= settings.freeDeliveryAbove ? 0 : settings.deliveryFee;
      return {
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
        count: cart.reduce((s, l) => s + l.qty, 0),
      };
    };

    return {
      menu,
      orders,
      cart,
      settings,
      admin,
      ready,
      backendConnected,
      totals,

      addToCart: (item, qty, variant) => {
        const half = variant === "Half" && item.halfPrice;
        const key = `${item.id}-${variant || "Full"}`;
        setCart((prev) => {
          const ex = prev.find((l) => l.key === key);
          if (ex) {
            return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
          }
          return [
            ...prev,
            {
              key,
              itemId: item.id,
              name: item.name,
              variant: item.halfPrice ? variant || "Full" : undefined,
              portion: half ? "Half portion" : item.portion,
              price: half ? item.halfPrice : item.price,
              qty,
            },
          ];
        });
      },

      setQty: (key, qty) => {
        setCart((prev) =>
          qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))
        );
      },

      clearCart: () => setCart([]),

      placeOrder: async (customer, payment) => {
        const t = totals();
        const now = new Date();
        const ds = now.toISOString().slice(0, 10).replace(/-/g, "");
        const seq = orders.filter((o) => o.id && o.id.includes(ds)).length + 1;
        const localOrder = {
          id: `GS-${ds}-${String(seq).padStart(3, "0")}`,
          customer,
          items: cart,
          subtotal: t.subtotal,
          deliveryFee: t.deliveryFee,
          discount: 0,
          total: t.total,
          payment,
          status: "Pending",
          createdAt: now.toISOString(),
        };

        // Try backend first
        try {
          const res = await orderApi.create({ customer, items: cart, payment });
          if (res.data?.data) {
            const serverOrder = res.data.data;
            setOrders((prev) => [serverOrder, ...prev]);
            setCart([]);
            return serverOrder;
          }
        } catch (err) {
          console.warn("Backend order creation failed, saved locally:", err);
        }

        // Local fallback
        setOrders((prev) => [localOrder, ...prev]);
        setCart([]);
        return localOrder;
      },

      setStatus: async (id, status) => {
        // Update local state immediately
        setOrders((prev) => prev.map((x) => (x.id === id ? { ...x, status } : x)));

        // Sync with backend
        try {
          await orderApi.updateStatus(id, status);
        } catch (err) {
          console.warn("Backend status update failed:", err);
        }
      },

      saveMenuItem: async (item) => {
        setMenu((prev) => {
          const exists = prev.some((x) => x.id === item.id);
          return exists ? prev.map((x) => (x.id === item.id ? item : x)) : [...prev, item];
        });

        try {
          const exists = menu.some((x) => x.id === item.id);
          if (exists) {
            await menuApi.update(item.id, item);
          } else {
            await menuApi.create(item);
          }
        } catch (err) {
          console.warn("Backend menu item save failed:", err);
        }
      },

      deleteMenuItem: async (id) => {
        setMenu((prev) => prev.filter((x) => x.id !== id));
        try {
          await menuApi.delete(id);
        } catch (err) {
          console.warn("Backend menu item delete failed:", err);
        }
      },

      saveSettings: async (newSettings) => {
        setSettings(newSettings);
        try {
          await settingApi.update(newSettings);
        } catch (err) {
          console.warn("Backend settings update failed:", err);
        }
      },

      login: async (email, password) => {
        // Try backend API first
        try {
          const res = await authApi.login(email, password);
          if (res.data?.success && res.data?.token) {
            localStorage.setItem("gharswaad_token", res.data.token);
            setAdmin(true);
            return true;
          }
        } catch (err) {
          console.warn("Backend auth failed, trying offline credentials:", err);
        }

        // Offline demo fallback
        const inputEmail = email.trim().toLowerCase();
        const ok =
          (inputEmail === "admin@gharswaad.in" || inputEmail === "saiyamrajput71@gmail.com") &&
          password === "gharswaad123";
        if (ok) {
          localStorage.setItem("gharswaad_token", "demo_admin_token");
          setAdmin(true);
        }
        return ok;
      },

      logout: () => {
        localStorage.removeItem("gharswaad_token");
        setAdmin(false);
      },
    };
  }, [menu, orders, cart, settings, admin, ready, backendConnected]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export function customersFrom(orders = []) {
  const map = new Map();
  for (const o of orders) {
    if (!o.customer || !o.customer.phone) continue;
    const key = o.customer.phone;
    const entry = map.get(key) || {
      customer: o.customer,
      orders: [],
      spent: 0,
      last: o.createdAt,
    };
    entry.orders.push(o);
    if (o.status !== "Cancelled") {
      entry.spent += Number(o.total || 0);
    }
    if (new Date(o.createdAt) > new Date(entry.last)) {
      entry.last = o.createdAt;
    }
    map.set(key, entry);
  }
  return [...map.values()].sort((a, b) => b.spent - a.spent);
}
