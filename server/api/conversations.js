const express = require('express');
const app = express.Router();
const { Conversation, User } = require('../db');
const { Op } = require('sequelize');
module.exports = app;
/*------ /api/conversations ------*/

//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
app.get('/:userId', async (req, res, next) => {
  try {
    const conversation = await Conversation.findAll({
      where: {
        members: { [Op.contains]: [req.params.userId] },
      },
      order: [['updatedAt', 'DESC']],
    });
    res.send(conversation);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.send(newConversation);
  } catch (ex) {
    next(ex);
  }
});
