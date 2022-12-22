const conn = require('../conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;

const Post = conn.define('post', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  text: {
    type: TEXT,
    allowNull: true,
  },
  mediaUrl: {
    type: TEXT,
    allowNull: true,
  },
  // To do: Do we save the type language?
  code: {
    type: TEXT,
  },
  language: {
    type: STRING,
  },
});

module.exports = Post;
