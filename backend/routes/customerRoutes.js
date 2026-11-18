const express = require('express');
const router = express.Router();
const { getCustomers, getCustomerByPhone } = require('../controllers/customerController');

router.get('/', getCustomers);
router.get('/:phone', getCustomerByPhone);

module.exports = router;
