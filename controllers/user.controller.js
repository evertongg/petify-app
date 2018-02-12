const User = require('../models/user.model');

module.exports.show = (req, res, next) => {
  res.render('user/user');
};

module.exports.edit = (req, res, next) => {
  res.render('user/edit');
};
