const { users } = require('../data');
const { schedules } = require('../data');

exports.checkID = (req, res, next) => {
  if (req.params.id * 1 > users.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: 'success',
    data: {
      user: users[id],
    },
  });
};

exports.getScheduleByUser = (req, res) => {
  const { id } = req.params;
  const schedule = schedules.filter((el) => el.user_id === +id);
  res.status(200).json({
    status: 'success',
    data: {
      schedule:
        schedule.length === 0
          ? 'No schedules for this user in database'
          : schedule,
    },
  });
};
