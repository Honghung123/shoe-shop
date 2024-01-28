const router = require('express').Router();
const multer = require('multer');
const userController = require('../controller/user.c');
const upload = require('../config/multer.config');
router.put("/:id", upload.single('image'), userController.updateInfor);
module.exports = router;