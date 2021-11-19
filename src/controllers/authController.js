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

  if (password.length < 8) {
    errors.push({ message: 'Your password should contain at least 8 characters' });
  }

  if (password !== passwordRepeat) {
    errors.push({ message: 'Passwords should be the same. Please try again' });
  }

  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        errors.push({ message: 'User with this email already exists' });
      }

      if (errors.length > 0) {
        res.render('new-user-form', { errors });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  next();
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('auth/login', {
    pageTitle: 'Log In',
    path: '/login'
  });
};

exports.login = (req, res) => {
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
        res.status(200).redirect('/');
      } else {
        res.status(401).render('auth/login', {
          errors: [{ message: 'Email not found or password incorrect.' }],
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).redirect('/');
  });
};

exports.getSignupPage = (req, res) => {
  res.status(200).render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup'
  });
};

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => User.create({
      firstname: req.body.firstname.trim(),
      lastname: req.body.lastname.trim(),
      email: req.body.email,
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
      res.status(201).redirect('/login');
    })
    .catch((err) => {
      console.log(err);
    });
};
