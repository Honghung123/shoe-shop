const router = require("express").Router();
const clientController = require("../controller/client.c");
const shoppingController = require("../controller/shopping.c");
const authorize = require("../middleware/authorize");

// router.use(authorize("customer"));
router.get("/", clientController.renderHomePage);
router.get("/shop", clientController.renderShoppingPage);
router.post("/get-product", shoppingController.postShoppingPage);
router.get("/checkout", clientController.renderCheckoutPage);
router.get("/voucher", clientController.renderVoucherPage);
router.get("/discount", clientController.renderDiscountPage);
router.get("/account", clientController.renderAccountPage);
router.get("/cart", clientController.renderCartPage);
router.get("/favorite", clientController.renderFavorPage);
router.get("/details", clientController.renderDetailsPage);
router.get("/contact", clientController.renderContactPage); 
router.get("/home", clientController.renderHomePage)

module.exports = router;
