const User = require('../models/user.model');

module.exports.show = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
  .then((foundUser) => {
    res.render('profile/profile', {
      foundUser: foundUser
    });
  })
  .catch(err => {
    console.log(err);
  });
};
