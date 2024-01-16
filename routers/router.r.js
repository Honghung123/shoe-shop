const express = require("express");
const routers = express.Router();
const dashboardController = require("./../controller/admin/dashboard.c");
const accountController = require("./../controller/admin/account.c");
const categoryController = require("./../controller/admin/category.c");
const productController = require("./../controller/admin/product.c");
const orderController = require("./../controller/admin/order.c");

routers.get("/home", (req, res) => {
  res.render("client/home");
});

routers
  .route("/admin")
  .get(dashboardController.getDashboardPage)
  .post(dashboardController.getDashboardPage);

routers.route("/admin/account").get(accountController.getAccountPage);

routers.route("/admin/category").get(categoryController.getCategoryPage);

routers.route("/admin/product").get(productController.getProductPage);

routers.route("/admin/order").get(orderController.getOrderPage);

module.exports = routers;
