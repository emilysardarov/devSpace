const express = require('express');
const app = express.Router();
const { User, Interest, Group } = require('../db');

app.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      include: [
        {
          model: Interest,
        },
        {
          model: Group,
        },
      ],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//alternative way to find a user by id
/*---- /api/users/user/:id ---*/
app.get('/user/:id', async (req, res, next) => {
  try {
    const userbyId = await User.findByPk(req.params.id);
    res.send(userbyId);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
