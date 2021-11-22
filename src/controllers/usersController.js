const User = require('../models/User');
const Schedule = require('../models/Schedule');

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).render('users', {
        pageTitle: 'Users',
        path: '/users',
        allUsers: users,
      });
    }).catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      res.status(200).render('user', {
        user,
      });
    }).catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getMyProfile = (req, res) => {
  res.status(200).render('my-profile', {
    pageTitle: 'My Profile',
    path: '/users/my/profile',
    successMsg: req.flash('success'),
  });
};

exports.updateMyProfile = (req, res, next) => {
  User.update({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  }, {
    where: {
      id: req.session.user.id
    }
  })
    .then(() => {
      req.session.user.firstname = req.body.firstname;
      req.session.user.lastname = req.body.lastname;
      req.session.user.email = req.body.email;
      req.flash('success', 'Your profile has been updated successfully');
      res.status(200).redirect('/users/my/profile');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteMyAccount = (req, res, next) => {
  User.destroy({ where: { id: req.body.id } })
    .then(() => {
      req.flash('success', 'Your account and all your schedules have been deleted permanently');
      next();
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getScheduleByUser = (req, res, next) => {
  const { id } = req.params;
  Schedule.findAll({ where: { userId: id } })
    .then((schedules) => {
      res.status(200).render('user-schedule', {
        userSchedules: schedules,
        pageTitle: 'User schedule',
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getForm = (req, res) => {
  res.status(200).render('new-user-form', {
    pageTitle: 'Add New User',
    path: '/users/new',
    isAdmin: true
  });
};
