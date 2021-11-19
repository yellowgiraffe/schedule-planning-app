const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.checkConflicts = (req, res, next) => {
  // Schedule.findOne({ where: day = req.body.day })
  //   .then()
  //   .catch((err) => {
  //     console.log(err);
  //   });

  next();
};

exports.getAllSchedules = (req, res) => {
  Schedule.findAll({ include: [{ model: User }] })
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

exports.getMySchedules = (req, res) => {
  Schedule.findAll({ where: { userId: req.session.user.id } })
    .then((schedules) => {
      res.status(200).render('my-schedules', {
        pageTitle: 'My schedules',
        path: '/schedules/my',
        allSchedules: schedules,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createSchedule = (req, res) => {
  Schedule.create({
    day: req.body.day,
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    userId: req.session.user.id
  }).then(() => {
    res.status(201).redirect('schedules');
  }).catch((err) => {
    console.log(err);
  });
};

exports.editForm = (req, res) => {
  Schedule.findByPk(req.params.id)
    .then((schedule) => {
      res.status(200).render('edit-schedule', {
        pageTitle: 'Edit schedule',
        schedule,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateSchedule = (req, res) => {
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
      res.status(200).redirect('/schedules/my');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.foo = (req, res, next) => {
  console.log(78787878);
  next();
};

exports.deleteSchedule = (req, res) => {
  Schedule.destroy({ where: { id: req.body.id } })
    .then(() => {
      res.status(200).redirect('/schedules/my');
    })
    .catch((err) => {
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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
