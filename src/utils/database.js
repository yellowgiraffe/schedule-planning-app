const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://schedules_app_admin:admin1234@localhost:5432/schedules_app'
);

module.exports = sequelize;

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'schedules_app_admin',
//   database: 'schedules_app',
//   password: 'admin1234',
//   host: 'localhost',
//   port: 5432,
// });

// module.exports = pool;

// CREATE DATABASE schedules_app
// CREATE user schedules_app_admin WITH ENCRYPTED PASSWORD 'admin1234'
// GRANT ALL PRIVILEGES ON DATABASE schedules_app TO schedules_app_admin
// GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO schedules_app_admin;
