const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin.c');
const upload = require("../config/multer.config");
const authorize = require('../middleware/authorize')

router.use(authorize('admin'));

// router.get("/home", (req, res) => {
//   res.render("client/home");
// });
router.get("/error", (req, res) => {
  console.log("Get error page");
  res.render("error");
});

router
  .route("/")
  .get(adminController.getDashboardPage);
  // .post(dashboardController.getDashboardPage);

router.route("/account").get(adminController.getAccountPage);

router.route("/category").get(adminController.getCategoryPage);

router.route("/product").get(adminController.getProductPage).post(upload.array('images', 10), (req, res) => {
  
  console.log(req.files, req.body);
  
  
})

router.route("/order").get(adminController.getOrderPage);


module.exports = router;
