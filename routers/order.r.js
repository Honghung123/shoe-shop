const router = require("express").Router();
const orderController = require("../controller/order.c");
router
  .route("/:id")
  .get(orderController.getOrderDetails)
  .put(orderController.updateOrderStatus);
module.exports = router;
