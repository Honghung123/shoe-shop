const express = require("express");
const router = express.Router();
const paymentController = require('../controller/payment.c')

router.get('/payment/login', paymentController.renderLoginPayment)
      .get('/payment/register', paymentController.renderRegisterPayment)
      .get('/payment/process', paymentController.renderPayment) 
      .post('/payment/login', paymentController.postPaymentLogin)
      .post('/payment-register', paymentController.postPaymentRegister) 

module.exports = router