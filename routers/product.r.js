const router = require('express').Router();
const upload = require('../config/multer.config')
const productController = require('../controller/product.c')

router.post('/', upload.array('images', 10), productController.addProduct)
router.get('/', productController.findProducts)
router.route('/:id')
    .get(productController.getProductDetails)




// router.put('/:id', productController);
// router.delete('/:id')
module.exports = router