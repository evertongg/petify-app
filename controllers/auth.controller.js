const User = require('../models/user.model');
const passport = require('passport');
require('mongoose');
require('../config/config.passport')(passport);


// GET HOME page with login and signup modals.
module.exports.show = (req, res) => {
  let errors;

    res.render('index', {
      errors,
      petname: req.body.petname,
      ownername: req.body.ownername,
      email: req.body.email,
    });
};

// DO SIGN UP and save user in the DB
module.exports.doSignup = (req, res, next) => {
  let errors = [];

  if (!req.body.petname) {
    errors.push({
      text: 'Petname is required'
    });
  }
  if (!req.body.ownername) {
    errors.push({
      text: 'Ownername is required'
    });
  }
  if (!req.body.email) {
    errors.push({
      text: 'Email is required'
    });
  }
  if (!req.body.password) {
    errors.push({
      text: 'Password is required'
    });
  }
  if (!req.body.location) {
    errors.push({
      text: 'Location is required'
    });
  }
  if (req.body.password !== req.body.password2) {
    errors.push({
      text: 'Passwords do not match'
    });
  }
  if (errors.length > 0) {
    const {
      petname,
      ownername,
      email,
      location
    } = req.body;
    res.render('index', {
      errors,
      petname,
      ownername,
      email,
      location
    });

  } else {
    //Check if user is already in DB
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {

          const {
            petname,
            ownername,
            email,
            password,
            animaltype,
            sex,
          } = req.body;

          const newUser = {
            petname,
            ownername,
            email,
            password,
            animaltype,
            sex,
            city: req.body.location,
            location: {
              lat: req.body.lat,
              lng: req.body.lng
            }
          };

          user = new User(newUser);
          user.save()
            .then(() => {
              req.flash('success_msg', 'Welcome, you are successfully registered! You are now able to log in');
              res.redirect('/');
            }).catch((err) => {
              console.log(err);
            });
        } else {
          errors.push({
            text: 'User already registered with this email!'
          });
          res.render('index', {
            errors: errors,
            petname: req.body.petname,
            ownername: req.body.ownername,
            email: req.body.email,
            location: req.body.location
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// DO LOGIN
module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
};

// DO Logout

module.exports.doLogout = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out. Hope to see you soon!');
  res.redirect('/');

};
