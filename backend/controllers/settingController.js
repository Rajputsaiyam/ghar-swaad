const store = require('../data/store');

const getSettings = async (req, res) => {
  try {
    const settings = await store.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('getSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.deliveryFee !== undefined) updates.deliveryFee = Number(updates.deliveryFee);
    if (updates.freeDeliveryAbove !== undefined) updates.freeDeliveryAbove = Number(updates.freeDeliveryAbove);
    if (updates.minOrder !== undefined) updates.minOrder = Number(updates.minOrder);
    if (updates.acceptingOrders !== undefined) updates.acceptingOrders = Boolean(updates.acceptingOrders);

    const updated = await store.updateSettings(updates);
    res.json({ success: true, data: updated, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('updateSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
