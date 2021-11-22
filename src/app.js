const path = require('path');
const csrf = require('csurf');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const SequalizeStore = require('connect-session-sequelize')(session.Store);

const rootDir = require('./utils/path');
const sequelize = require('./utils/database');

const usersRouter = require('./routes/usersRouter');
const schedulesRouter = require('./routes/schedulesRouter');
const authRouter = require('./routes/authRouter');

const User = require('./models/User');
const Schedule = require('./models/Schedule');

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

app.use(flash({ sessionKeyName: 'flashMessage', useCookieSession: true }));
app.use(protectionToken);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res, next) => {
  Promise.all([User.findAndCountAll(), Schedule.findAndCountAll()])
    .then((result) => {
      res.status(200).render('home', {
        pageTitle: 'Schedules website',
        path: '/',
        allUsers: result[0].count,
        allSchedules: result[1].count,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);
app.use(authRouter);

app.get('/500', (req, res) => {
  res.status(500).render('500', { pageTitle: 'Server error' });
});

app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page not found' });
});

app.use((error, req, res) => {
  res.status(500).redirect('500');
});

module.exports = app;
