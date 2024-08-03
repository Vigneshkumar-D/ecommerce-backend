const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { authenticate } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session management endpoints
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Retrieve all active sessions for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active sessions
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
 *                   userId:
 *                     type: integer
 *                     example: 101
 *                   ipAddress:
 *                     type: string
 *                     example: '192.168.1.1'
 *                   userAgent:
 *                     type: string
 *                     example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2024-08-01T12:34:56Z'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, sessionController.getSessions);

module.exports = router;
