const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const authController = require('../controllers/AuthController');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile',verifyToken, authController.profileGet);
router.put('/profile/update',verifyToken, authController.profileUpdate);
router.put('/profile/password/update',verifyToken, authController.passwordUpdate);

module.exports = router;