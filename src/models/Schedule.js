const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Schedule = sequelize.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  startAt: {
    type: Sequelize.TIME,
    allowNull: false
  },
  endAt: {
    type: Sequelize.TIME,
    allowNull: false
  }
});

module.exports = Schedule;
