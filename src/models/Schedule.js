const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Schedule = sequelize.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  startAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Schedule;
