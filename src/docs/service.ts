/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Endpoints for managing services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - price
 *         - contactPerson
 *         - contactEmail
 *         - status
 *       properties:
 *         Serviceid:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the service
 *         title:
 *           type: string
 *           description: Title of the service
 *         description:
 *           type: string
 *           description: Description of the service
 *         category:
 *           type: string
 *           description: Category of the service
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the service
 *         contactPerson:
 *           type: string
 *           description: Name of the contact person
 *         contactEmail:
 *           type: string
 *           format: email
 *           description: Contact email for the service
 *         status:
 *           type: string
 *           description: Status of the service (e.g., available, unavailable)
 *         image:
 *           type: string
 *           description: URL of the service image
 */

/**
 * @swagger
 * /services/add:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /services/list:
 *   get:
 *     summary: Retrieve all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Retrieve a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Service details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
