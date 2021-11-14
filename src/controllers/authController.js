exports.getLogin = (req, res) => {
  res.status(200).render('auth/login', {
    pageTitle: 'Log In',
    path: '/login'
  });
};

exports.getSignup = (req, res) => {
  res.status(200).render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup'
  });
};