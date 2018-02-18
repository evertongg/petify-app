const User = require('../models/user.model');
const Picture = require('../models/picture.model');

module.exports.showResults = (req, res, next) => {
const search = req.body.search;

  User.findOne({'petname' : `${search}`})
  .then((results) => {
    console.log(results);
    res.render('search',{
      search: req.body.search,
      results: [results]
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports.show = (req, res) => {
  let message = 'No search found';

  res.render('search', {
    search: message
  });
};
