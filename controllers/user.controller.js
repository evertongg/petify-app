const User = require('../models/user.model');
const {getSex} = require('../config/getSex');

module.exports.show = (req, res) => {
  console.log(res.locals.user);
  const {_id} = res.locals.user;
  User.findById(_id)
  .then((user) => {
    const sex = getSex(user.sex);
    res.render('user/user', {
      user,
      sex
    });
  })
  .catch(err => {
    console.log(err);
  });
};

module.exports.edit = (req, res, next) => {
  res.render('user/edit');
};

module.exports.addPost = (req, res, next) => {
  res.send('sending post');
};
