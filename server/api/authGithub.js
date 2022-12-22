const express = require('express');
const app = express.Router();
const { User } = require('../db');
module.exports = app;

//url for this route '/github/callback'
app.get('/', async (req, res, next) => {
  try {
    const { token } = await User.authGithub(req.query.code);
    // res.send(token)
    res.send(`
        <html>
            <body>
                <script>
                    window.localStorage.setItem('token', '${token}');
                    window.document.location = '/#/';
                </script>
            </body>
        </html>
    `);
  } catch (ex) {
    next(ex);
  }
});
