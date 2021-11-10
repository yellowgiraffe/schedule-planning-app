const app = require('./app');

const sequelize = require('./utils/database');

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`Up & Running on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
