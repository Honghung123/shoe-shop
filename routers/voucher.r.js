const router = require('express').Router();
const voucherController = require('../controller/voucher.c')
router.route('/')
    .get(voucherController.getAvailableVouchers);
module.exports = router