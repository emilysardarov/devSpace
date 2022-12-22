const express = require('express');
const app = express.Router();
const { Message, User } = require('../db');

module.exports = app;
/*------ /api/messages ------*/
app.get('/:conversationId', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: { conversationId: req.params.conversationId },
      include: [{ model: User, as: 'sender' }],
      order: [['createdAt', 'ASC']],
    });
    res.send(messages);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body);
    res.send(newMessage);
  } catch (ex) {
    next(ex);
  }
});
