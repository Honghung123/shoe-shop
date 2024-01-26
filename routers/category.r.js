const router = require("express").Router();
const categoryController = require("../controller/category.c");
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Endpoint to add a new category.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Example Category
 *     responses:
 *       '201':
 *         description: Successfully created a new category.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Example Category
 *       '500':
 *         description: Internal server error.

 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Endpoint to delete a category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update a category by ID
 *     description: Endpoint to update a category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Updated Category
 *     responses:
 *       '200':
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Updated Category
 *       '400':
 *         description: Bad request. Invalid request payload.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */
router.route("/").post(categoryController.addCategory);
router
  .route("/:id")
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

module.exports = router;
