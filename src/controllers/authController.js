const bcrypt = require('bcrypt');
const User = require('../models/User');

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
        res.render('new-user-form', {
          errors,
          isLoggedIn: true,
        });
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
        req.session.save((err) => {
          console.log(err);
          res.status(200).redirect('/');
        });
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
      password: hashedPassword,
    }))
    .then(() => {
      res.status(201).redirect('/login');
    }).catch((err) => {
      console.log(err);
    });
};
