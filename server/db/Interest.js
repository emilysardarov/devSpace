const conn = require('./conn');
const { UUID, UUIDV4, STRING } = conn.Sequelize;

const Interest = conn.define('interest', {
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

module.exports = Interest;
