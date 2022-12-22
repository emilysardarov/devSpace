const express = require('express');
const app = express.Router();
const { conn, User, Relation } = require('../db');

app.get('/:username/followers', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const followers = await conn.query(
      `
      SELECT R.id 
            ,R."userSource" as "userId"
            ,U.username
            ,U."firstName" 
            ,U."lastName"
            ,U."profilePic"
            ,U."githubUsername"
        FROM relations as R
            ,users as U            
       where R."userTarget" = :user
         and R."userSource" = U."id"
      `,
      {
        replacements: { user: user.id },
        type: conn.QueryTypes.SELECT,
      }
    );
    res.send(followers);
  } catch (ex) {
    next(ex);
  }
});

app.get('/:username/followings', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const followings = await conn.query(
      `
      SELECT R.id
            ,R."userTarget" as "userId"
            ,U."username"
            ,U."firstName" 
            ,U."lastName"
            ,U."profilePic"
            ,U."githubUsername"
        FROM relations as R
            ,users as U
       where R."userSource" = :user
         and R."userTarget" = U."id"
      `,
      {
        replacements: { user: user.id },
        type: conn.QueryTypes.SELECT,
      }
    );
    res.send(followings);
  } catch (ex) {
    next(ex);
  }
});

app.post('/follow', async (req, res, next) => {
  try {
    res.status(201).send(await Relation.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete('/unfollow/:id', async (req, res, next) => {
  try {
    const follow = await Relation.findByPk(req.params.id);
    await follow.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
