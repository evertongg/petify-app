const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const SALT_FACTOR = 10;
require('mongoose');


// GET HOME page with login and signup modals.
module.exports.show = (req, res) => {
  let errors;
  res.render('index', {
    errors,
    petname: req.body.petname,
    ownername: req.body.ownername,
    email: req.body.email,
    location: req.body.location
  });
  console.log(errors);
};

module.exports.doSignup = (req, res, next) => {
  let errors = [];

  if (!req.body.petname) {
    errors.push({text: 'Petname is required'});
  }
  if (!req.body.ownername) {
    errors.push({text: 'Ownername is required'});
  }
  if (!req.body.email) {
    errors.push({text: 'Email is required'});
  }
  if (!req.body.password) {
    errors.push({text: 'Password is required'});
  }
  if (!req.body.location) {
    errors.push({text: 'Location is required'});
  }
  if (req.body.password !== req.body.password2) {
      errors.push({text: 'Passwords do not match'});
  }
  if (errors.length > 0) {
    res.render('index', {
      errors: errors,
      petname: req.body.petname,
      ownername: req.body.ownername,
      email: req.body.email,
      location: req.body.location
    });

  } else {

    //Check if user is already in DB
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          user = new User({
            petname: req.body.petname,
            ownername: req.body.ownername,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            animaltype: req.body.animaltype,
            sex: req.body.sex
          });
          user.save()
          .then(() => {
            res.redirect('/user');
          }).catch((err) => {
            console.log(err);
          });
        } else {
          res.redirect('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
