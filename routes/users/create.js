import express from 'express';
const router = express.Router();
import { createUser, validateUser } from '../../controllers/userController.js';

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data or user already exists
 */
router.post('/', validateUser, createUser);

export default router;