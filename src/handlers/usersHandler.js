const { users } = require('../data');
const { schedules } = require('../data');

exports.checkID = (req, res, next) => {
  if (req.params.id * 1 >= users.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID. User does not exist',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  let valid;

  if (!firstname || !lastname || !email || !password) {
    valid = false;
  } if (firstname.trim() === lastname.trim()) {
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
  res.status(200).render('users', { allUsers: users });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: 'success',
    data: {
      user: users[id],
    },
  });
};

exports.getScheduleByUser = (req, res) => {
  const { id } = req.params;
  const schedule = schedules.filter((el) => el.user_id === +id);
  res.status(200).json({
    status: 'success',
    data: {
      schedule:
        schedule.length === 0
          ? 'No schedules for this user in database'
          : schedule,
    },
  });
};

exports.createUser = (req, res) => {
  const newUser = { ...req.body };
  users.push(newUser);
  res.status(201).json({
    status: 'success',
    data: users[users.length - 1],
  });
};
