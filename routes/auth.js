const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const authController = require('../controllers/AuthController');



/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create new user 
 *     parameters:
 *       - in: body
 *         name: user body 
 *         schema:
 *           type: object
 *         required: true
 *         description:  user object
 *     responses:
 *       200:
 *         description: The user create
 *       
 *       404:
 *         description: The user was not found
 */
router.post('/register', authController.register);


/**
 * @swagger
 * /api/login:
 *   post:  
 *     summary: Login  user 
 *     parameters:
 *       - in: body
 *         name: request body 
 *         schema:
 *           type: object
 *         required: true
 *         description:  user token
 *     responses:
 *       200:
 *         description: The user login success
 *       
 *       404:
 *         description: The user was not found
 */
router.post('/login', authController.login);
router.get('/profile',verifyToken, authController.profileGet);
router.put('/profile/update',verifyToken, authController.profileUpdate);
router.put('/profile/password/update',verifyToken, authController.passwordUpdate);

module.exports = router;