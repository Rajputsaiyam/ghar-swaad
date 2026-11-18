const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  trackOrder,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/track', trackOrder);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
