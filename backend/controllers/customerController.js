const store = require('../data/store');

const getCustomers = async (req, res) => {
  try {
    const orders = await store.getOrders();
    const map = new Map();

    for (const o of orders) {
      if (!o.customer || !o.customer.phone) continue;
      const key = o.customer.phone;
      const entry = map.get(key) || {
        customer: o.customer,
        orders: [],
        totalSpent: 0,
        lastOrder: o.createdAt,
      };

      entry.orders.push(o);
      if (o.status !== 'Cancelled') {
        entry.totalSpent += Number(o.total || 0);
      }
      if (new Date(o.createdAt) > new Date(entry.lastOrder)) {
        entry.lastOrder = o.createdAt;
      }
      map.set(key, entry);
    }

    const customers = [...map.values()].sort((a, b) => b.totalSpent - a.totalSpent);
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    console.error('getCustomers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch customers' });
  }
};

const getCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const orders = await store.getOrders();
    const cleanPhone = phone.trim();

    const customerOrders = orders.filter(
      (o) => o.customer && (o.customer.phone === cleanPhone || o.customer.whatsapp === cleanPhone)
    );

    if (customerOrders.length === 0) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const customer = customerOrders[0].customer;
    const totalSpent = customerOrders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + Number(o.total || 0), 0);
    const lastOrder = customerOrders.reduce(
      (latest, o) => (new Date(o.createdAt) > new Date(latest) ? o.createdAt : latest),
      customerOrders[0].createdAt
    );

    res.json({
      success: true,
      data: {
        customer,
        totalOrders: customerOrders.length,
        totalSpent,
        lastOrder,
        orders: customerOrders,
      },
    });
  } catch (error) {
    console.error('getCustomerByPhone error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch customer profile' });
  }
};

module.exports = {
  getCustomers,
  getCustomerByPhone,
};
