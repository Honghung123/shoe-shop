const router = require('express').Router();
const favouriteController = require('../controller/favourite.c')
router.post('/', favouriteController.addToFavourite);
router.delete('/delete', favouriteController.removeFromFavourite);

module.exports = router;