const express = require('express');
const path = require('path');

const rootDir = require('./utils/path');

const usersRouter = require('./routes/usersRouter');
const schedulesRouter = require('./routes/schedulesRouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

const { users } = require('./data');
const { schedules } = require('./data');

app.get('/', (req, res) => {
  res.status(200).render('home', {
    pageTitle: 'Schedules website',
    allUsers: users,
    allSchedules: schedules,
    date: new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }),
    path: '/',
  });
});

app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);

app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page not found' });
});

module.exports = app;
