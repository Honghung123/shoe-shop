const express = require("express");
const router = express.Router();
const transactionController = require('../controller/transaction.c');
router.post('/', transactionController.createTransaction)
router.put('/', transactionController.completeTransaction)
module.exports = router;