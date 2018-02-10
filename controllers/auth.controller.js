const User = require('../models/user.model');
const bcrypt = require('bcrypt');
// const passport = require('passport');
require('mongoose');



// GET home page.
module.exports.auth = ((req, res) => {
  let errorMessage =
  res.render('auth/auth');
})

// Register POST request
module.exports.doSignup = ((req, res, next) => {
  let errors = [];

  const {
    petname: petname,
    ownername: ownername,
    email: email,
    password: password,
    password2: password2,
    location: location,
    animaltype: animaltype,
    sex: sex
  } = req.body;


// Check if user is already in DB

    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          const newUser = new User({
            petname: req.body.petname,
            ownername: req.body.ownername,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            animaltype: req.body.animaltype,
            sex: req.body.sex
          });

          // Encrypting pw and saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  // req.flash('success_msg', 'You are now registered and can log in')
                  res.redirect('/profile');
                })
                .catch((err) => {
                  console.log(err);
                  return;
                })
            })
          })
        } else {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/auth');
        }
      })
      .catch((err) => {
        console.log(err);
      })

})


////////////




//
// module.exports.login = ((req, res, next) => {
//     let errorMessage = '';
//     res.render('auth/login', {
//         errorMessage: errorMessage
//     });
// })
// module.exports.doLogin = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     if (!email || !password) {
//         res.render('auth/login', {
//             user: { email: email },
//             errorMessage: {
//                 email: email ? '' : 'Email is required',
//                 password: password ? '' : 'Password is required'
//             }
//         });
//     } else {
//         passport.authenticate('local-auth', (error, user, validation) => {
//             if (error) {
//                 next(error);
//             } else if (!user) {
//                 res.render('auth/login', { error: validation });
//             } else {
//                 req.login(user, (error) => {
//                     if (error) {
//                         next(error);
//                     } else {
//                         req.flash('welcome', `Welcome back ${user.email}`);
//                         res.redirect('/dashboard');
//                     }
//                 });
//             }
//         })(req, res, next);
//     }
// }
// module.exports.doLogout = ((req, res, next) => {
//     req.logout();
//     res.redirect('/');
// });
