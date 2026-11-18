const express = require('express');
const router = express.Router();
const { processChatMessage } = require('../services/ragService');

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const response = processChatMessage(message, history);
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Failed to process message' });
  }
});

module.exports = router;
