const path = require('path');
const csrf = require('csurf');
const express = require('express');
const session = require('express-session');
const SequalizeStore = require('connect-session-sequelize')(session.Store);

const rootDir = require('./utils/path');
const sequelize = require('./utils/database');

const usersRouter = require('./routes/usersRouter');
const schedulesRouter = require('./routes/schedulesRouter');
const authRouter = require('./routes/authRouter');
const { users } = require('./data');
const { schedules } = require('./data');
// const User = require('./models/User');

const protectionToken = csrf();
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: new SequalizeStore({ db: sequelize }),
}));

app.use(protectionToken);

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.session.user;

  next();
});

app.get('/', (req, res) => {
  res.status(200).render('home', {
    pageTitle: 'Schedules website',
    path: '/',
    allUsers: users,
    allSchedules: schedules,
  });
});

app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);
app.use(authRouter);

app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page not found' });
});

module.exports = app;
