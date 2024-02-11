const userRouter =  require('./user');
const accountsRouter = require('./account');

const express = require('express');
const router = express.Router();

router.use("/user", userRouter)
router.use("/account", accountsRouter)

module.exports = router;