const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, ARRAY } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;
const axios = require('axios');

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  githubUsername: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  profilePic: {
    type: TEXT,
  },
  location: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  bio: {
    type: STRING,
  },
  topics: {
    type: ARRAY(TEXT),
    defaultValue: [],
  },
});

User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw 'user not found';
  } catch (ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  } else {
    const error = 'Wrong credentials';
    return error;
  }
  /* const error = new Error('bad credentials');
  error.status = 401;
  throw error; */
};

//github oAuth
//docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
//https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
User.authGithub = async function (code) {
  let response = await axios.post(
    GITHUB_TOKEN_URL,
    {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
  const { access_token } = response.data;
  if (!access_token) {
    return response.data;
  }
  response = await axios.get(GITHUB_USER_URL, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  const { login, node_id, avatar_url, location, bio, email } = response.data;

  let user = await User.findOne({
    where: {
      username: login,
    },
  });
  if (!user) {
    user = await User.create({
      username: login,
      password: node_id,
      profilePic: avatar_url,
      location: location,
      bio: bio,
      githubUsername: login,
      email: email,
    });
  }
  return { token: jwt.sign({ id: user.id }, JWT), id: user.id };
};

module.exports = User;
