const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { Note } = require('../models');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ author: req.ctx.userId });
  res.json(notes);
});

router.post('/', auth, async (req, res) => {
  await Note.create({
    author: req.ctx.userId,
    ...req.body,
  });
  res.sendStatus(200);
});

router.patch('/:id', auth, async (req, res) => {
  const { id: noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note)
    return res.sendStatus(404);
  if (post.author != req.ctx.userId)
    return res.sendStatus(403);
  note._doc = { ...note._doc, ...req.body };
  await note.save();
  res.sendStatus(200);
});

module.exports = router;
