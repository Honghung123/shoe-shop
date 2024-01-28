const router = require("express").Router();
const upload = require("../config/multer.config");
const productController = require("../controller/product.c");

router.post("/", upload.array("images", 10), productController.addProduct);
router.get("/", productController.findProducts);
router.get("/top5", productController.topFiveProduct)
router
  .route("/:id")
  .get(productController.getProductDetails)
  .delete(productController.deleteProduct);
module.exports = router;
