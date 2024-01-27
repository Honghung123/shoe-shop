const router = require('express').Router();
const cartLineController = require('../controller/cart-line.c')
router.post('/', cartLineController.addToCart);
router.delete('/:id', cartLineController.removeFromCart)
router.get('/', cartLineController.viewCart);

module.exports = router;