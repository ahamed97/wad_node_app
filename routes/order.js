const express = require('express');
const router = express.Router();
const orderController = require('../controllers/customer/OrderController');


router.post('/order', orderController.post);

module.exports = router;