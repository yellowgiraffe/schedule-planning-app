const { schedules } = require('../data');
const { users } = require('../data');

exports.getAllSchedules = (req, res) => {
  res.status(200).render('schedules', { allSchedules: schedules });
};

exports.createSchedule = (req, res) => {
  const newSchedule = { ...req.body };
  schedules.push(newSchedule);
  res.status(201).json({
    status: 'success',
    data: schedules[schedules.length - 1],
  });
};

exports.getForm = (req, res) => {
  res.status(200).render('new-schedule-form', {
    pageTitle: 'Add New Schedule',
    date: new Date().toLocaleDateString('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    allUsers: users,
    allSchedules: schedules,
    path: '/schedules/new',
  });
};
