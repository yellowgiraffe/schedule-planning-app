const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.getAllSchedules = (req, res) => {
  Schedule.findAll()
    .then((schedules) => {
      res.status(200).render('schedules', {
        pageTitle: 'Schedules',
        path: '/schedules',
        allSchedules: schedules,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createSchedule = (req, res) => {
  console.log(req.session.user.id);
  console.log(req.session.user);
  Schedule.create({
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    userId: req.session.user.id
  }).then(() => {
    res.status(201).redirect('schedules');
  }).catch((err) => {
    console.log(err);
  });
};

exports.getForm = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).render('new-schedule-form', {
        pageTitle: 'Add New Schedule',
        allUsers: users,
        path: '/schedules/new',
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
