const express = require("express");
const router = express.Router();
const paymentController = require('../controller/payment.c')

router.get('/payment/login', paymentController.renderLoginPayment)
      .get('/payment/process', paymentController.renderPayment)
      .get('/payment/invoice', paymentController.renderInvoice)

module.exports = router