const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { User } = require('../models');
const { UserRouter, NoteRouter } = require('./index');
const router = express.Router();

router.use('/user', UserRouter);
router.use('/note', NoteRouter);

router.get('/currentUser', auth, async (req, res) => {
  const user = await User.findById(req.ctx.userId);
  if (!user)
    return res.sendStatus(404);
  res.json(user);
});

router.get('/logout', auth, async (req, res) => {
  res.clearCookie('x-access-token').sendStatus(200);
});

module.exports = router;
