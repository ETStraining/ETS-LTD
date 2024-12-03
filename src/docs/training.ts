/**
 * @swagger
 * tags:
 *   name: Trainings
 *   description: Endpoints for managing trainings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Training:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - location
 *       properties:
 *         trainingId:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the training
 *         title:
 *           type: string
 *           description: Title of the training
 *         description:
 *           type: string
 *           description: Description of the training
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the training
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the training
 *         location:
 *           type: string
 *           description: Location where the training will be held
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the training was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the training details were last updated
 */

/**
 * @swagger
 * /trainings/add:
 *   post:
 *     summary: Create a new training
 *     tags: [Trainings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       201:
 *         description: Training created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainings/list:
 *   get:
 *     summary: Retrieve all trainings
 *     tags: [Trainings]
 *     responses:
 *       200:
 *         description: A list of trainings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Training'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainings/{id}:
 *   get:
 *     summary: Retrieve a training by ID
 *     tags: [Trainings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the training to retrieve
 *     responses:
 *       200:
 *         description: Training details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       404:
 *         description: Training not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainings/{id}:
 *   put:
 *     summary: Update a training by ID
 *     tags: [Trainings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the training to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       200:
 *         description: Training updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       404:
 *         description: Training not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /trainings/{id}:
 *   delete:
 *     summary: Delete a training by ID
 *     tags: [Trainings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of the training to delete
 *     responses:
 *       204:
 *         description: Training deleted successfully
 *       404:
 *         description: Training not found
 *       500:
 *         description: Internal server error
 */
