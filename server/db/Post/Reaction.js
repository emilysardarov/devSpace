const conn = require('../conn');
const { UUID, UUIDV4, ENUM } = conn.Sequelize;

// foreign keys: post id, user id

const Reaction = conn.define('reaction', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: ENUM('like', 'love', 'dislike', 'haha', 'wow', 'angry', 'sad'),
    allowNull: true,
  },
});

module.exports = Reaction;
