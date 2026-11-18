import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gharswaad_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const menuApi = {
  getAll: () => api.get("/menu"),
  create: (item) => api.post("/menu", item),
  update: (id, updates) => api.put(`/menu/${id}`, updates),
  delete: (id) => api.delete(`/menu/${id}`),
};

export const orderApi = {
  create: (order) => api.post("/orders", order),
  getAll: (params) => api.get("/orders", { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  track: (id, phone) => api.get("/orders/track", { params: { id, phone } }),
};

export const customerApi = {
  getAll: () => api.get("/customers"),
  getByPhone: (phone) => api.get(`/customers/${phone}`),
};

export const settingApi = {
  get: () => api.get("/settings"),
  update: (settings) => api.put("/settings", settings),
};

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  verify: () => api.get("/auth/verify"),
};

export const chatApi = {
  sendMessage: (message, history) => api.post("/chat", { message, history }),
};

export const whatsappApi = {
  getSettings: () => api.get("/whatsapp/settings"),
  updateSettings: (data) => api.patch("/whatsapp/settings", data),
  getLogs: (limit = 50) => api.get("/whatsapp/logs", { params: { limit } }),
  dispatchManual: (data) => api.post("/whatsapp/dispatch-manual", data),
  broadcastAll: (data) => api.post("/whatsapp/broadcast-all", data),
};

export default api;
