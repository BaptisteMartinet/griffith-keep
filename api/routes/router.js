const express = require('express');
const router = express.Router();
const { UserRouter, NoteRouter } = require('./index');

router.use('/user', UserRouter);
router.use('/note', NoteRouter);

module.exports = router;
