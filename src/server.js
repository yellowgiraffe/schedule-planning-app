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
  // .sync({ force: true })
  .sync()
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({
        firstname: 'Natalia',
        lastname: 'Lis',
        email: 'lis.natalia@gmail.com',
        password: '$2a$10$zQEY2mRNNfTyq3hGJvnhX.8wguSHXsYYb3X9wqeq9.ndM1TqPpReG' // Natalia87
      });
    }
    return user;
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Up & Running on ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
