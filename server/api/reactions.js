const express = require('express');
const app = express.Router();
const { Reaction, User, Post } = require('../db');

module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const reactions = await Reaction.findAll({
      include: [{ model: User }, { model: Post }],
    });
    res.send(reactions);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const reaction = await Reaction.create(req.body);
    const reactionPlusUser = await Reaction.findByPk(reaction.id, {
      include: [{ model: User }, { model: Post }],
    });
    res.send(reactionPlusUser);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const reaction = await Reaction.findByPk(req.params.id);
    await reaction.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
