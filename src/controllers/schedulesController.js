const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.checkSchedule = (req, res, next) => {
  const errors = [];

  if (req.body.startAt > req.body.endAt) {
    errors.push({ message: 'Start time can not be later then end time' });
  }

  Schedule.findAll({ where: { day: req.body.day } })
    .then((days) => {
      if (days) {
        days.forEach((day) => {
          if (day.id !== +req.body.id) {
            if (day.startAt <= req.body.endAt && day.endAt >= req.body.startAt) {
              errors.push({
                message: `New time range is overlapping existing schedule ${day.startAt} - ${day.endAt}.`
              });
            }
          }
        });
      }
      if (errors.length > 0) {
        if (req.body.id) {
          return res.status(422).render('edit-schedule', {
            pageTitle: 'Edit Schedule',
            errors,
            schedule: {
              id: req.body.id,
              day: req.body.day,
              startAt: req.body.startAt,
              endAt: req.body.endAt
            },
          });
        }
        return res.status(422).render('new-schedule-form', {
          pageTitle: 'Add New Schedule',
          errors,
        });
      }
      next();
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAllSchedules = (req, res, next) => {
  Schedule.findAll({ include: [{ model: User }] })
    .then((schedules) => {
      res.status(200).render('schedules', {
        pageTitle: 'Schedules',
        path: '/schedules',
        allSchedules: schedules,
        successMsg: req.flash('success')
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getMySchedules = (req, res, next) => {
  Schedule.findAll({ where: { userId: req.session.user.id } })
    .then((schedules) => {
      res.status(200).render('my-schedules', {
        pageTitle: 'My schedules',
        path: '/schedules/my',
        allSchedules: schedules,
        successMsg: req.flash('success')
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getForm = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).render('new-schedule-form', {
        pageTitle: 'Add New Schedule',
        allUsers: users,
        path: '/schedules/new',
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.createSchedule = (req, res, next) => {
  Schedule.create({
    day: req.body.day,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    userId: req.session.user.id
  }).then((schedule) => {
    req.flash('success', `New schedule for ${new Date(schedule.day).toLocaleDateString('en-GB', { month: 'long', day: 'numeric' })} has been created`);
    res.status(201).redirect('schedules');
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.editForm = (req, res, next) => {
  Schedule.findByPk(req.params.id)
    .then((schedule) => {
      res.status(200).render('edit-schedule', {
        pageTitle: 'Edit schedule',
        schedule,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.updateSchedule = (req, res, next) => {
  Schedule.update({
    day: req.body.day,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => {
      req.flash('success', 'Your schedule has been updated!');
      res.status(200).redirect('/schedules/my');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteSchedule = (req, res, next) => {
  Schedule.destroy({ where: { id: req.body.id } })
    .then(() => {
      req.flash('success', 'Schedule was deleted successfully!');
      res.status(200).redirect('/schedules/my');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
