const User = require('../models/user.model');

module.exports.showResults = (req, res, next) => {
  res.render('search', {
    search: req.body.search
  });
};
