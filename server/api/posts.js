const express = require('express');
const app = express.Router();
const { Post, User } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });
    res.send(posts);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    const postPlusUser = await Post.findByPk(post.id, {
      include: [{ model: User }],
      order: [['createdAt', 'DESC']],
    });
    res.send(postPlusUser);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    await post.update(req.body);
    res.send(post);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
