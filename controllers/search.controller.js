const User = require('../models/user.model');

module.exports.showResults = (req, res, next) => {
  res.render('search', {
    search: req.body.search
  });
};

module.exports.show = (req, res) => {
  let message = 'No search found';
  
  res.render('search', {
    search: message
  });
};
