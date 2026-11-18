const { SEED_MENU, SEED_SETTINGS, buildSeedOrders } = require('./seedData');
const { getIsConnected } = require('../config/db');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Setting = require('../models/Setting');

// In-memory fallback repository
let inMemoryMenu = [...SEED_MENU];
let inMemoryOrders = buildSeedOrders(new Date());
let inMemorySettings = { ...SEED_SETTINGS };

const store = {
  // Menu operations
  async getMenu() {
    if (getIsConnected()) {
      try {
        const count = await MenuItem.countDocuments();
        if (count === 0) {
          await MenuItem.insertMany(SEED_MENU);
        }
        return await MenuItem.find().sort({ createdAt: 1 });
      } catch (err) {
        console.warn('MongoDB query failed, falling back to in-memory store:', err.message);
      }
    }
    return inMemoryMenu;
  },

  async addMenuItem(item) {
    if (getIsConnected()) {
      try {
        const newItem = new MenuItem(item);
        return await newItem.save();
      } catch (err) {
        console.warn('MongoDB add failed, falling back to in-memory store:', err.message);
      }
    }
    inMemoryMenu.push(item);
    return item;
  },

  async updateMenuItem(id, updates) {
    if (getIsConnected()) {
      try {
        return await MenuItem.findOneAndUpdate({ id }, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB update failed, falling back to in-memory store:', err.message);
      }
    }
    inMemoryMenu = inMemoryMenu.map((m) => (m.id === id ? { ...m, ...updates } : m));
    return inMemoryMenu.find((m) => m.id === id);
  },

  async deleteMenuItem(id) {
    if (getIsConnected()) {
      try {
        return await MenuItem.findOneAndDelete({ id });
      } catch (err) {
        console.warn('MongoDB delete failed, falling back to in-memory store:', err.message);
      }
    }
    const idx = inMemoryMenu.findIndex((m) => m.id === id);
    if (idx !== -1) inMemoryMenu.splice(idx, 1);
    return true;
  },

  // Order operations
  async getOrders() {
    if (getIsConnected()) {
      try {
        const count = await Order.countDocuments();
        if (count === 0) {
          await Order.insertMany(inMemoryOrders);
        }
        return await Order.find().sort({ createdAt: -1 });
      } catch (err) {
        console.warn('MongoDB getOrders failed, falling back to in-memory store:', err.message);
      }
    }
    return inMemoryOrders;
  },

  async getOrderById(id) {
    if (getIsConnected()) {
      try {
        return await Order.findOne({ id });
      } catch (err) {
        console.warn('MongoDB getOrderById failed, falling back to in-memory store:', err.message);
      }
    }
    return inMemoryOrders.find((o) => o.id === id);
  },

  async createOrder(order) {
    inMemoryOrders.unshift(order);
    if (getIsConnected()) {
      try {
        const newOrder = new Order(order);
        return await newOrder.save();
      } catch (err) {
        console.warn('MongoDB createOrder failed, fallback to in-memory store:', err.message);
      }
    }
    return order;
  },

  async updateOrderStatus(id, status) {
    inMemoryOrders = inMemoryOrders.map((o) => (o.id === id ? { ...o, status } : o));
    if (getIsConnected()) {
      try {
        const doc = await Order.findOneAndUpdate({ id }, { status }, { new: true });
        if (doc) return doc;
      } catch (err) {
        console.warn('MongoDB updateStatus failed, fallback to in-memory store:', err.message);
      }
    }
    return inMemoryOrders.find((o) => o.id === id);
  },

  // Settings operations
  async getSettings() {
    if (getIsConnected()) {
      try {
        let doc = await Setting.findOne();
        if (!doc) {
          doc = await Setting.create(SEED_SETTINGS);
        }
        return doc;
      } catch (err) {
        console.warn('MongoDB getSettings failed, falling back to in-memory store:', err.message);
      }
    }
    return inMemorySettings;
  },

  async updateSettings(updates) {
    if (getIsConnected()) {
      try {
        let doc = await Setting.findOne();
        if (!doc) {
          return await Setting.create(updates);
        }
        return await Setting.findOneAndUpdate({}, updates, { new: true });
      } catch (err) {
        console.warn('MongoDB updateSettings failed, falling back to in-memory store:', err.message);
      }
    }
    inMemorySettings = { ...inMemorySettings, ...updates };
    return inMemorySettings;
  },
};

module.exports = store;
