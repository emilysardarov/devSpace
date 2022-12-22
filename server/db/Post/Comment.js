const conn = require('../conn');
const { UUID, UUIDV4, TEXT } = conn.Sequelize;

// foreign keys: post id, user id

const Comment = conn.define('comment', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  commentText: {
    type: TEXT,
    unique: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Comment;
