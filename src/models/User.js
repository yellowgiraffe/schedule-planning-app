// const db = require('../utils/database');

// module.exports = class User {
//   constructor(firstname, lastname, email, passowrd, imageUrl) {
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.email = email;
//     this.passowrd = passowrd;
//     this.imageUrl = imageUrl;
//   }

//   // add() {
//   //   users.push(this);
//   // }

//   static getAll() {
//     return db.query('SELECT * FROM users');
//   }
// };

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
