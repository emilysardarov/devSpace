const conn = require('./conn');
const { UUID, UUIDV4, STRING } = conn.Sequelize;

const Group = conn.define('group', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Group;
