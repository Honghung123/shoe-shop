const router = require("express").Router();
const clientController = require("../controller/client.c");
const shoppingController = require("../controller/shopping.c");
const discountController = require("../controller/discount.c");
const authorize = require("../middleware/authorize");

router.get("/", clientController.renderHomePage);
router.post("/search", clientController.postQuerySearch);
router.get("/shop", clientController.renderShoppingPage);
router.post("/get-product", shoppingController.postShoppingPage);
router.post("/get-product-id", clientController.postProductbyId);
router.get("/voucher", clientController.renderVoucherPage);
router.get("/discount", clientController.renderDiscountPage);
router.post("/get-discount", discountController.postDiscountPage);
router.get("/detail", clientController.renderDetailsPage);
router.get("/contact", clientController.renderContactPage); 
router.get("/home", clientController.renderHomePage)

router.use(authorize("customer"));
router.get("/update-profile", clientController.renderUpdateProfilePage); 
router.get("/account", clientController.renderAccountPage);
router.get("/cart", clientController.renderCartPage);
router.get("/order", clientController.renderOrderPage);
router.get("/favorite", clientController.renderFavorPage);
router.get("/invoice/:orderId", clientController.renderInvoice)
module.exports = router;
