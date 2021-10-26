const express = require('express');
const app = express();

const { users } = require('./data');
const { schedules } = require('./data');


app.get('/', (req, res) => {
  res
  .status(404)
  .send('Welcome to our schedule website!');
});

app.get('/users', (req, res) => {
  res
  .status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

app.get('/schedules', (req, res) => {
  res
  .status(200).json({
    status: 'success',
    results: schedules.length,
    data: {
      schedules
    }
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Up & Running...');
});
