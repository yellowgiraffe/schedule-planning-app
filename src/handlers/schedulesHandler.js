const { schedules } = require('../data');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: schedules.length,
    data: {
      schedules,
    },
  });
};
