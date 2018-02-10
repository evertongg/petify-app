const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('mongoose');


// GET HOME page with login and signup modals.
module.exports.show = (req, res) => {
  res.render('index');
};
