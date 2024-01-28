const router = require('express').Router();
const cartLineController = require('../controller/cart-line.c')
router.post('/', cartLineController.addToCart);
router.delete('/delete', cartLineController.removeFromCart)
router.post('/update', cartLineController.updateCartLine);

module.exports = router;