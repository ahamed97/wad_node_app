const express = require('express');
const router = express.Router();
const socialController = require('../controllers/SocialController');


router.post('/login', socialController.login);

module.exports = router;