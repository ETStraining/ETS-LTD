/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Endpoints related to admin management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the admin
 *         firstName:
 *           type: string
 *           description: The admin's first name
 *         lastName:
 *           type: string
 *           description: The admin's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The admin's unique email address
 *         password:
 *           type: string
 *           description: The admin's hashed password
 *         isActive:
 *           type: boolean
 *           description: Whether the admin is active (default is true)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the admin was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the admin was last updated
 *     AdminLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The admin's email address
 *         password:
 *           type: string
 *           description: The admin's plain-text password (will be hashed)
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all admins (admin privilege required)
 *     description: Fetches a list of all admins in the system. Requires admin authentication.
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get an admin by ID (admin privilege required)
 *     description: Fetches details of a specific admin by their ID. Requires admin authentication.
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID (UUID)
 *     responses:
 *       200:
 *         description: Admin details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Create a new admin
 *     description: Adds a new admin to the system. The password will be hashed automatically before storing.
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete an admin (admin privilege required)
 *     description: Deletes an admin by their ID. Requires admin authentication.
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID (UUID)
 *     responses:
 *       204:
 *         description: Admin successfully deleted
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Log in as an admin and receive a JWT token.
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLogin'
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for admin access
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
