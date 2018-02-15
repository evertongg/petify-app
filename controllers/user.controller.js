const User = require('../models/user.model');
const Post = require('../models/posts.model');
const Picture = require('../models/picture.model');
const moment = require('moment');

module.exports.show = (req, res) => {
  const {_id} = res.locals.user;

// Find user
  User.findById(_id)
  .then((user) => {
    // Find posts of user
      Post.find({owner_id: user._id})
      .then((posts) => {
        Picture.find({})
        .then((pictures) => {
          console.log(pictures)
          res.render('user/user', {
            user,
            pictures,
            posts
          });
        })
      })
      //.catch(err => console.log(err));
    //
    // res.render('user/user', {
    //   user,
    //   posts
    // });
  })
  .catch(err => {
    console.log(err);
  });
};

// module.exports.showPictures = (req, res, next) => {
// const {_id} = res.locals.user;
//
//   Picture.find({_id: user.id})
//   .then((pictures) => {
//     console.log(pictures);
//     res.render('user/user', {
//       user: user
//       pictures: pictures
//     });
//   })
//     .catch(err => console.log(err));
//     res.render('user/user', {
//       pictures
//     })
// };

module.exports.edit = (req, res, next) => {
  res.render('user/edit');
};

module.exports.addPost = (req, res, next) => {
  res.send('sending post');
};



module.exports.savePic = (req, res) => {
  console.log(req.file);

  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
};
