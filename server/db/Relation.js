const conn = require('./conn');
const { UUID, UUIDV4 } = conn.Sequelize;

const Relation = conn.define('relation', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userSource: {
    type: UUID,
    allowNull: false,
  },
  userTarget: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Relation;
