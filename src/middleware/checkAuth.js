module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(403).redirect('/login');
  }

  next();
};
