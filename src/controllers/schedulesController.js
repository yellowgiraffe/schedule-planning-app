const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.getAllSchedules = (req, res) => {
  Schedule.findAll()
    .then((schedules) => {
      res.status(200).render('schedules', {
        pageTitle: 'Schedules',
        path: '/schedules',
        allSchedules: schedules,
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

exports.createSchedule = (req, res) => {
  req.user.createSchedule({
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    userId: req.user.id
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
        date: new Date().toLocaleDateString('en', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        }),
        allUsers: users,
        path: '/schedules/new',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
