const store = require('../data/store');
const { STATUSES } = require('../data/seedData');
const { autoDispatchOrderEvent } = require('../services/whatsappAutomationService');

const createOrder = async (req, res) => {
  try {
    const { customer, items, payment = "Cash on Delivery" } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone, and address are required',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart items cannot be empty',
      });
    }

    const settings = await store.getSettings();
    if (!settings.acceptingOrders) {
      return res.status(400).json({
        success: false,
        message: "Sorry, GharSwaad is currently not accepting new orders.",
      });
    }

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
    const deliveryFee = subtotal === 0 || subtotal >= settings.freeDeliveryAbove ? 0 : settings.deliveryFee;
    const total = subtotal + deliveryFee;

    const now = new Date();
    const ds = now.toISOString().slice(0, 10).replace(/-/g, '');
    const existingOrders = await store.getOrders();
    const todayOrdersCount = existingOrders.filter((o) => o.id && o.id.includes(ds)).length;
    const seq = todayOrdersCount + 1;
    const orderId = `GS-${ds}-${String(seq).padStart(3, '0')}`;

    const orderData = {
      id: orderId,
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        whatsapp: (customer.whatsapp || customer.phone).trim(),
        address: customer.address.trim(),
        landmark: customer.landmark ? customer.landmark.trim() : '',
        deliveryType: customer.deliveryType || 'Office',
        companyName: customer.companyName ? customer.companyName.trim() : '',
      },
      items,
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      payment,
      status: 'Pending',
      createdAt: now.toISOString(),
    };

    const savedOrder = await store.createOrder(orderData);

    // AI Automation: Automatically dispatch WhatsApp confirmation in background
    autoDispatchOrderEvent('ORDER_CONFIRMED', savedOrder).catch((err) => {
      console.error('Auto-dispatch error on createOrder:', err);
    });

    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await store.getOrders();
    const { status, limit } = req.query;

    let filtered = [...orders];
    if (status) {
      filtered = filtered.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }

    if (limit) {
      filtered = filtered.slice(0, Number(limit));
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('getOrders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await store.getOrderById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('getOrderById error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid values: ${STATUSES.join(', ')}`,
      });
    }

    const updated = await store.updateOrderStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // AI Automation: Automatically dispatch WhatsApp status update in background
    autoDispatchOrderEvent(status, updated).catch((err) => {
      console.error('Auto-dispatch error on updateOrderStatus:', err);
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('updateOrderStatus error:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

const trackOrder = async (req, res) => {
  try {
    const { id, phone } = req.query;

    if (!id || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and phone number are required for tracking',
      });
    }

    const orders = await store.getOrders();
    const cleanId = id.trim().toLowerCase();
    const cleanPhone = phone.trim();

    const order = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanId &&
        (o.customer.phone === cleanPhone || o.customer.whatsapp === cleanPhone)
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'No order found matching the provided Order ID and phone number.',
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('trackOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to track order' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  trackOrder,
};
