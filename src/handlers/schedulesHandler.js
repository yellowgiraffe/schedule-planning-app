// const { schedules } = require('../data');
// const { users } = require('../data');
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
  // res.status(200).render('schedules', { allSchedules: schedules });
};

exports.createSchedule = (req, res) => {
  console.log(req.body);
  Schedule.create({
    id: req.body.id,
    date: req.body.day,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    // req.user.createSchedule
  }).then(() => {
    res.status(201).redirect('/schedules');
  }).catch((err) => {
    console.log(err);
  });
  // const newSchedule = { ...req.body };
  // schedules.push(newSchedule);
  // res.status(201).json({
  //   status: 'success',
  //   data: schedules[schedules.length - 1],
  // });
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
  // res.status(200).render('new-schedule-form', {
  //   pageTitle: 'Add New Schedule',
  //   date: new Date().toLocaleDateString('en', {
  //     weekday: 'long',
  //     month: 'long',
  //     day: 'numeric',
  //   }),
  //   allUsers: users,
  //   allSchedules: schedules,
  //   path: '/schedules/new',
  // });
};
