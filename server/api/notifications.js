const express = require('express');
const app = express.Router();
const { conn, User, Notification } = require('../db');

app.get('/follow/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const notifications = await conn.query(
      `
      SELECT N.id 
            ,N."userId"
            ,N."actingUserId" as "actingUserId"
            ,U.username
            ,U."firstName" 
            ,U."lastName"
            ,U."profilePic"
            ,N."createdAt" 
            FROM notifications as N
            ,users as U            
       WHERE N."userId" = :user
         AND N."actingUserId" = U.id
         AND N."type" = 'follow'
       ORDER BY N."createdAt" DESC   
      `,
      {
        replacements: { user: user.id },
        type: conn.QueryTypes.SELECT,
      }
    );
    res.send(notifications);
  } catch (ex) {
    next(ex);
  }
});

app.get('/message/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const notifications = await conn.query(
      `
      SELECT N.id 
            ,N."userId"
            ,N."actingUserId" as "actingUserId"
            ,U.username
            ,U."firstName" 
            ,U."lastName"
            ,U."profilePic"
            ,N."createdAt" 
            FROM notifications as N
            ,users as U            
       WHERE N."userId" = :user
         AND N."actingUserId" = U.id
         AND N."type" = 'message'
      `,
      {
        replacements: { user: user.id },
        type: conn.QueryTypes.SELECT,
      }
    );
    res.send(notifications);
  } catch (ex) {
    next(ex);
  }
});

app.post('/follow/', async (req, res, next) => {
  try {
    res.status(201).send(await Notification.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/message/', async (req, res, next) => {
  try {
    res.status(201).send(await Notification.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/follow/:id', async (req, res, next) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    await notification.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/message/:userId', async (req, res, next) => {
  try {
    await Notification.destroy({
      where: { userId: req.params.userId, type: 'message' },
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
