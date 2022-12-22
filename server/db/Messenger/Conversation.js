const conn = require('../conn');
const { ARRAY, UUID, UUIDV4 } = conn.Sequelize;

const Conversation = conn.define('conversation', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  members: {
    type: ARRAY(UUID),
  },
});

module.exports = Conversation;

/* 
const Conversation = conn.define('conversation', {
  member1: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  member21: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
});

*/
