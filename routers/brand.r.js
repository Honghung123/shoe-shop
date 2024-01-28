const express = require("express");
const router = express.Router();
const brandController = require('../controller/brand.c')
router.get('/top5brand', brandController.getTop5BrandRevenueByMonth)
module.exports = router