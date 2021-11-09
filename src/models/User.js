const { users } = require('../data');

module.exports = class User {
  constructor(firstname, lastname, email, passowrd, imageUrl) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.passowrd = passowrd;
    this.imageUrl = imageUrl;
  }

  add() {
    users.push(this);
  }

  static getAll() {
    return users;
  }
};
