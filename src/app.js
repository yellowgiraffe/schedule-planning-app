const express = require('express');

const usersRouter = require('./routes/usersRouter');
const schedulesRouter = require('./routes/schedulesRouter');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to our schedule website!');
});

app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);

module.exports = app;
