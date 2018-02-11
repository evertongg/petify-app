const User = require('../models/user.model');

module.exports.show = (req, res, next) => {
  console.log(req.params.id);
  res.render('user');
};
