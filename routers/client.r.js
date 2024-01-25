const router = require('express').Router();
const clientController = require('../controller/client.c')
router.get('/', clientController.renderHomePage)
router.get('/shop', clientController.renderShoppingPage);
router.get('/checkout', clientController.renderCheckoutPage);
router.get('/voucher', clientController.renderVoucherPage);
router.get('/discount', clientController.renderDiscountPage);
router.get('/account', clientController.renderAccountPage);
router.get('/cart', clientController.renderCartPage);
router.get('/favourite', clientController.renderFavorPage)
router.get('/account', clientController.renderDetailsPage)
router.get('details', clientController.renderDetailsPage)
module.exports = router