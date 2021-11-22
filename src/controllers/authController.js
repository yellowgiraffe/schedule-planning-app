const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const transport = require('nodemailer-sendgrid-transport');
const User = require('../models/User');

const transporter = nodemailer.createTransport(transport({
  auth: {
    api_key: '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'
  }
}));

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

  if (firstname.match(/\d|\s/) || lastname.match(/\d|\s/)) {
    errors.push({ message: 'Your firstname and lastname may contain only letters' });
  }

  if (password.length < 8) {
    errors.push({ message: 'Your password should contain at least 8 characters' });
  }

  if (!password.match(/[A-Z]/)) {
    errors.push({ message: 'Your password should contain at least one capital letter' });
  }

  if (password !== passwordRepeat) {
    errors.push({ message: 'Passwords should be the same. Please try again' });
  }

  User.findOne({ where: { email: req.body.email.trim() } })
    .then((user) => {
      if (user) {
        errors.push({ message: 'User with this email already exists' });
      }

      if (errors.length > 0) {
        return res.render('auth/signup', {
          user: {
            firstname: req.body.firstname
          },
          errors
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

exports.getLoginPage = (req, res) => {
  res.status(200).render('auth/login', {
    pageTitle: 'Log In',
    path: '/login',
    successMsg: req.flash('success'),
    errors: req.flash('error')
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        req.session.user = user;
        req.session.save();
        return bcrypt.compare(req.body.password, user.password);
      }
      return false;
    })
    .then((isEqual) => {
      if (isEqual) {
        req.session.isLoggedIn = true;
        return res.status(200).redirect('/');
      }
      req.flash('error', 'Email not found or password incorrect.');
      res.status(401).redirect('login');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/login');
  });
};

exports.getSignupPage = (req, res) => {
  res.status(200).render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup'
  });
};

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => User.create({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email.trim(),
      password: hashedPassword
    }))
    .then((user) => {
      if (req.body.sendEmail === 'on') {
        res.status(201).redirect('/login');
        return transporter.sendMail({
          to: user.email,
          from: 'ol.miroch@gmail.com',
          subject: 'Welcome to our schedule app',
          html: '<h1>The registration is completed. You can login using your email and password'
        });
      }
      req.flash('success', 'Registration is complited. You can login now');
      res.status(201).redirect('/login');
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
