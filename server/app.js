const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();
app.engine('html', require('ejs').renderFile);

app.use(express.json({ limit: '50mb' }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

/* app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
); */

app.get('/', (req, res) =>
  res.render(path.join(__dirname, '../static/index.html'), {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  })
);
app.use('/github/callback', require('./api/authGithub'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/users', require('./api/users'));
app.use('/api/relations', require('./api/relations'));
app.use('/api/comments', require('./api/comments'));
app.use('/api/reactions', require('./api/reactions'));
app.use('/api/notifications', require('./api/notifications'));
app.use('/api/conversations', require('./api/conversations'));
app.use('/api/messages', require('./api/messages'));

app.use((req, res, next) => {
  const err = Error('page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

module.exports = app;
