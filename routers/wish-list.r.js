const router = require('express').Router();
const wishListController = require('../controller/wish-list.c');
router.route("/")
    .get(wishListController.getWishListUser)
    .post(wishListController.addToWishList)
    .delete(wishListController.removeFromWishList)

module.exports = router