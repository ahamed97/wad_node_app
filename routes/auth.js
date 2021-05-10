const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const itemController = require('../controllers/ItemController');
router.post('/register', authController.register);
router.post('/login', authController.login);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Admin routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - image
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         desc:
 *           type: string
 *           description: The product description
 *         image:
 *           type: string
 *           description: The image url
 *         price:
 *           type: string
 *           description: The product price
 *       example:
 *         name: Test product
 *         desc: Product description
 *         image: https://picsum.photos/200/300
 *         price: 970
 */


/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Get all products
 *     description: Get all products
 *     responses:
 *       200:
 *         description: The list of the products
 */
router.get('/admin/products', itemController.getAll);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *       
 *       404:
 *         description: The product was not found
 */
router.get('/admin/products/:id', itemController.getById);


/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create new product 
 *     parameters:
 *       - in: body
 *         name: Product 
 *         schema:
 *           type: object
 *         required: true
 *         description:  product object
 *     responses:
 *       200:
 *         description: The product create
 *       
 *       404:
 *         description: The product was not found
 */
router.post('/admin/products', itemController.post);


/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update the product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *       - in: body
 *         name: Product 
 *         schema:
 *           type: object
 *         required: true
 *         description:  product object
 *     responses:
 *       200:
 *         description: The product description by id
 *       
 *       404:
 *         description: The product was not found
 */
router.put('/admin/products/:id', itemController.put);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Delete the product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Delete the product by id
 *     responses:
 *       200:
 *         description: The product delete by id
 *       
 *       404:
 *         description: The product was not found
 */
router.delete('/admin/products/:id', itemController.delete);

module.exports = router;