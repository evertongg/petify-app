const User = require('../models/user.model');
const {getSex} = require('../config/getsex');

module.exports.show = (req, res, next) => {
  const {id} = req.params;
  User.findById(id)
  .then((user) => {
    const sex = getSex(user.sex);
    console.log(user);
    res.render('profile/profile', {
      user,
      sex
    });
  })
  .catch(err => {
    console.log(err);
  });
};
