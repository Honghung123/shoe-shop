const router = require('express').Router();
const upload = require('../config/multer.config')
const productController = require('../controller/product.c')
router.post('/', upload.single('images'), productController.addProduct);
router.get('/category', productController.getProductsOfCategory)


// router.put('/:id', productController);
// router.delete('/:id')