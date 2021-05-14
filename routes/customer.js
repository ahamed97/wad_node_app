const express = require('express');
const router = express.Router();
const itemController = require('../controllers/customer/ItemController');


router.get('/items', itemController.getAll);
router.get('/items/:id', itemController.get);
module.exports = router;