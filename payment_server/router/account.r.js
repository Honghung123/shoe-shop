const router = require('express').Router();
const accountRouter = require('../controller/account.c');
router.post('/grant-access', accountRouter.grantAccess);
router.get('/:id', accountRouter.getAccountInfo);
module.exports = router