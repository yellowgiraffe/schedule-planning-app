const User = require('../models/User');
const Schedule = require('../models/Schedule');

exports.checkID = (req, res, next) => {
  // const users = User.getAll();
  // if (req.params.id * 1 >= users.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'Invalid ID. User does not exist',
  //   });
  // }
  next();
};

exports.validateNewUser = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordRepeat
  } = req.body;

  const errors = [];

  if (!firstname || !lastname || !email || !password || !passwordRepeat) {
    errors.push({ message: 'Please fill up all fields' });
  }

  if (password.length < 8) {
    errors.push({ message: 'Your password should contain at least 8 characters' });
  }

  if (password !== passwordRepeat) {
    errors.push({ message: 'Passwords should be the same. Please try again' });
  }

  if (errors.length > 0) {
    res.render('new-user-form', {
      errors,
      isLoggedIn: true,
    });
  }

  // if (firstname.trim() === lastname.trim()) {
  //   valid = false;
  // } else {
  //   valid = true;
  // }

  // if (!valid) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'Missing firstmane, lastname, email or password property',
  //   });
  // }
  next();
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).render('users', {
        pageTitle: 'Users',
        path: '/users',
        allUsers: users,
      });
    }).catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      res.status(200).render('user', {
        user,
      });
    }).catch((err) => {
      console.log(err);
    });
};

exports.getScheduleByUser = (req, res) => {
  const { id } = req.params;
  Schedule.findAll({ where: { userId: id } })
    .then((schedules) => {
      console.log(schedules);
      res.status(200).render('user-schedule', {
        userSchedules: schedules,
        pageTitle: 'User schedule',
      });
    });
};

exports.createUser = (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.status(201).redirect('/');
  }).catch((err) => {
    console.log(err);
  });
};

exports.getForm = (req, res) => {
  res.status(200).render('new-user-form', {
    pageTitle: 'Add New User',
    path: '/users/new',
    isLoggedIn: true,
  });
};
