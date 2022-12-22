const express = require('express');
const app = express.Router();
const { Comment, User, Post } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });
    res.send(comments);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    const commentPlusUser = await Comment.findByPk(comment.id, {
      include: [{ model: User }],
    });
    res.send(commentPlusUser);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    await comment.update(req.body);
    res.send(comment);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
