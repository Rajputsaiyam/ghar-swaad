const express = require('express');
const router = express.Router();
const {
  getAutomationConfig,
  updateAutomationConfig,
  getAutomationLogs,
  autoDispatchOrderEvent,
  sendRawWhatsAppMessage,
  broadcastTemplateToAllCustomers,
} = require('../services/whatsappAutomationService');

// GET current automation settings
router.get('/settings', (req, res) => {
  res.json({ success: true, data: getAutomationConfig() });
});

// PATCH update automation settings
router.patch('/settings', (req, res) => {
  try {
    const updated = updateAutomationConfig(req.body);
    res.json({ success: true, data: updated, message: 'WhatsApp AI automation settings updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// GET recent automated dispatch logs
router.get('/logs', (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  res.json({ success: true, count: getAutomationLogs(limit).length, data: getAutomationLogs(limit) });
});

// POST trigger manual / test automated message
router.post('/dispatch-manual', async (req, res) => {
  try {
    const { phone, name, templateType = 'ORDER_CONFIRMED', orderId, total, address } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Recipient phone is required' });
    }

    const logEntry = await autoDispatchOrderEvent(templateType, null, {
      phone,
      name,
      orderId,
      total,
      address,
    });

    res.json({ success: true, data: logEntry, message: 'Automated message dispatched' });
  } catch (err) {
    console.error('Manual dispatch error:', err);
    res.status(500).json({ success: false, message: 'Failed to dispatch message' });
  }
});

// POST mass broadcast template to all past customers
router.post('/broadcast-all', async (req, res) => {
  try {
    const { templateType = 'DAILY_MENU_BROADCAST' } = req.body;
    const result = await broadcastTemplateToAllCustomers(templateType);
    res.json({
      success: true,
      message: `Mass broadcast dispatched to ${result.dispatchedCount} customers!`,
      data: result,
    });
  } catch (err) {
    console.error('Broadcast all error:', err);
    res.status(500).json({ success: false, message: 'Failed to broadcast to all customers' });
  }
});

module.exports = router;

