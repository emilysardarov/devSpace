const conn = require('../conn');
const { UUID, UUIDV4, TEXT } = conn.Sequelize;
//foreign key: conversationId
//foreign key: userId->senderId
const Message = conn.define('message', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  text: {
    type: TEXT,
    allowNull: true,
  },
});

module.exports = Message;
