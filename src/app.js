const express = require('express');
const path = require('path');

const rootDir = require('./utils/path');

const usersRouter = require('./routes/usersRouter');
const schedulesRouter = require('./routes/schedulesRouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));

app.get('/', (req, res) => {
  res.status(200).render('home');
});

app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

module.exports = app;
