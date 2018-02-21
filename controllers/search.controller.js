const User = require('../models/user.model');
const Picture = require('../models/picture.model');

module.exports.showResults = (req, res, next) => {
  const search = req.body.search;
  User.findOne({'petname' : {
    $regex: new RegExp('^' + search.toLowerCase(), 'i')}
  })
  .then((results) => {
      res.render('search',{
        search: req.body.search || 'Repite tu búsqueda por favor',
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
