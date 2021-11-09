const User = require('../models/User');

const { schedules } = require('../data');

exports.checkID = (req, res, next) => {
  const users = User.getAll();
  if (req.params.id * 1 >= users.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID. User does not exist',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  let valid;

  if (!firstname || !lastname || !email || !password) {
    valid = false;
  }
  if (firstname.trim() === lastname.trim()) {
    valid = false;
  } else {
    valid = true;
  }

  if (!valid) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing firstmane, lastname, email or password property',
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  const users = User.getAll();
  res.status(200).render('users', {
    pageTitle: 'Users',
    allUsers: users,
    date: new Date().toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    path: '/users',
  });
};

exports.getUser = (req, res) => {
  const users = User.getAll();
  const { id } = req.params;
  res.status(200).render('user', { user: users[id] });
};

exports.getScheduleByUser = (req, res) => {
  const { id } = req.params;
  const schedule = schedules.filter((el) => el.user_id === +id);
  const users = User.getAll();
  const userID = users[id];
  console.log(userID);
  res.status(200).render('user-schedule', {
    userSchedules: schedule,
    firstname: userID.firstname,
    lastname: userID.lastname,
  });
};

exports.createUser = (req, res) => {
  const newUser = new User(
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password
  );
  const users = User.getAll();
  users.push(newUser);
  res.status(201).json({
    status: 'success',
    data: users[users.length - 1],
  });
};

exports.getForm = (req, res) => {
  const users = User.getAll();
  res.status(200).render('new-user', {
    pageTitle: 'Add New User',
    date: new Date().toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    allUsers: users,
    path: '/users/new',
  });
};
