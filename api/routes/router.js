const express = require('express');
const router = express.Router();
const { UserRouter } = require('./index');

router.use('/user', UserRouter);

module.exports = router;
