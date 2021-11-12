const User = require('../models/User');

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

exports.checkBody = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;

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
  User.findAll()
    .then((users) => {
      res.status(200).render('users', {
        pageTitle: 'Users',
        path: '/users',
        allUsers: users,
        date: new Date().toLocaleDateString('en', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
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
        date: new Date().toLocaleDateString('en', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
      });
    }).catch((err) => {
      console.log(err);
    });
};

exports.getScheduleByUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id);
  res.status(200).render('user-schedule', {
    // userSchedules: schedule,
    firstname: userID.firstname,
    lastname: userID.lastname,
    date: new Date().toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  });

  // // const schedule = schedules.filter((el) => el.user_id === +id);
  // const users = User.getAll();
  // const userID = users[id];
  // res.status(200).render('user-schedule', {
  //   // userSchedules: schedule,
  //   firstname: userID.firstname,
  //   lastname: userID.lastname,
  //   date: new Date().toLocaleDateString('en', {
  //     weekday: 'long',
  //     month: 'long',
  //     day: 'numeric',
  //   }),
  // });
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
  // const users = User.getAll();
  res.status(200).render('new-user-form', {
    pageTitle: 'Add New User',
    date: new Date().toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    // allUsers: users,
    path: '/users/new',
  });
};
