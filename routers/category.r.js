const router = require('express').Router();
const categoryController = require('../controller/category.c')
router.route('/')
    .post(categoryController.addCategory);
router.route('/:id')
    .delete(categoryController.deleteCategory)
    .put(categoryController.updateCategory)

module.exports = router

