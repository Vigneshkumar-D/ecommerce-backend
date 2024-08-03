const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Product Name'
 *               imageUrl:
 *                 type: string
 *                 example: 'https://example.com/image.png'
 *               description:
 *                 type: string
 *                 example: 'Product Description'
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               stockQuantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 'Product Name'
 *                   imageUrl:
 *                     type: string
 *                     example: 'https://example.com/image.png'
 *                   description:
 *                     type: string
 *                     example: 'Product Description'
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 29.99
 *                   stockQuantity:
 *                     type: integer
 *                     example: 100
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: 'Product Name'
 *                 imageUrl:
 *                   type: string
 *                   example: 'https://example.com/image.png'
 *                 description:
 *                   type: string
 *                   example: 'Product Description'
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 stockQuantity:
 *                   type: integer
 *                   example: 100
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Updated Product Name'
 *               imageUrl:
 *                 type: string
 *                 example: 'https://example.com/new-image.png'
 *               description:
 *                 type: string
 *                 example: 'Updated Product Description'
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               stockQuantity:
 *                 type: integer
 *                 example: 200
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticate, authorize(['admin']), productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, authorize(['admin']), productController.deleteProduct);

module.exports = router;
