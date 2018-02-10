// // const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// require('mongoose');



// GET home page.
module.exports.index = ((req, res) => {
  res.render('index');
})

// Register POST request
// module.exports.doSignup = ((req, res, next) => {
//     const { name, email, password } = req.body;
//     if (email) {
//         User.findOne({ email })
//             .then((user) => {
//                 if (user) {
//                     res.render('auth/signup', {
//                         errorMessage: 'El usuario ya existe',
//                     });
//                 }
//                 if (!name) {
//                     res.render('auth/signup', {
//                         errorMessage: 'Nombre requerido',
//                     });
//                 }
//                 if (!password || password.length < 5) {
//                     res.render('auth/signup', {
//                         errorMessage: 'La contraseña tiene que ser como mínimo de 5 carácteres.',
//                     });
//                 }
//                 const newUser = new User({ name, email, password })
//                 newUser.save()
//                     .then((laura) => {
//                         console.log('Entro en result de .save() => ')
//                         console.log(laura)
//                         res.redirect('/login')
//                     })
//                     .catch((error) => {
//                         console.log(error)
//                     });
//             })
//             .catch((error) => {
//                 console.log("Error");
//             })
//     } else {
//         res.render('auth/signup', {
//             errorMessage: '¿En serio te quieres registrar sin email? Pon un correo anda!!',
//         });
//     }
// })


////////////





module.exports.login = ((req, res, next) => {
    let errorMessage = '';
    res.render('auth/login', {
        errorMessage: errorMessage
    });
})
module.exports.doLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.render('auth/login', {
            user: { email: email },
            errorMessage: {
                email: email ? '' : 'Email is required',
                password: password ? '' : 'Password is required'
            }
        });
    } else {
        passport.authenticate('local-auth', (error, user, validation) => {
            if (error) {
                next(error);
            } else if (!user) {
                res.render('auth/login', { error: validation });
            } else {
                req.login(user, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        req.flash('welcome', `Welcome back ${user.email}`);
                        res.redirect('/dashboard');
                    }
                });
            }
        })(req, res, next);
    }
}
module.exports.doLogout = ((req, res, next) => {
    req.logout();
    res.redirect('/');
});
