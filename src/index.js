const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Welcome to our schedule website!');
});

app.get('/users', (req, res) => {
  res.send('');
});

app.get('schedules', (req, res) => {
  res.send('');
});

app.listen(PORT, () => {
  console.log('Up & Running...');
});
