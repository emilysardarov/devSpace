const conn = require('./conn');
const { UUID, UUIDV4, ENUM } = conn.Sequelize;

const Notification = conn.define('notification', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  type: {
    type: ENUM('follow', 'message'),
    allowNull: false,
  },
  actingUserId: {
    type: UUID,
    allowNull: true,
  },
});

module.exports = Notification;
