const router = require('express').Router();
const upload = require('../config/multer.config')
const productController = require('../controller/admin/product.c')
router.post('/', upload.single('product-img'), productController.addProduct);
router.get('/', productController.getProductPage);


// router.put('/:id', productController);
// router.delete('/:id')