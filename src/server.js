const app = require('./app');

const sequelize = require('./utils/database');

const User = require('./models/User');
const Schedule = require('./models/Schedule');

Schedule.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Schedule);

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Up & Running on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
