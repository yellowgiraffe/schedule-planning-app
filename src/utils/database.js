const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://schedules_app_admin:admin1234@localhost:5432/schedules_app'
);

module.exports = sequelize;
