const { users } = require('../data');

module.exports = class User {
  constructor(firstname, lastname, email, passowrd) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.passowrd = passowrd;
  }

  add() {
    users.push(this);
  }

  static getAll() {
    return users;
  }
};
