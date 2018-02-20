const User = require('../models/user.model');
const Post = require('../models/posts.model');
const Picture = require('../models/picture.model');
const moment = require('moment');

module.exports.show = (req, res) => {
  const {_id} = res.locals.user;

// Find user
  User.findById(_id)
  .then((user) => {
      Post.find({owner_id: user._id})
      .then((posts) => {
        Picture.find({owner_id: user._id})
        .then((pictures) => {
          res.render('user/user', {
            user,
            pictures,
            posts
          });
        });
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

// edit from process
module.exports.saveChanges = (req, res, next) => {
  const {_id} = res.locals.user;
// Find user
  User.findById(_id)
  .then(user => {
    //new value
    user.petname = req.body.petname,
    user.ownername = req.body.ownername,
    user.bio = req.body.bio,
    user.location = req.body.location,
    user.animaltype = req.body.animaltype,
    user.breed = req.body.breed,
    user.birthdate = moment(req.body.birthdate).format('LL'),
    user.skills = req.body.skills,
    user.character = req.body.character,
    user.sex = req.body.sex;

    //save edited idea
    user.save()
    .then(user => {
      req.flash('success_msg', 'Profile changes saved');
      res.redirect('/user');
    });
  });
};



module.exports.savePic = (req, res) => {
  const {_id} = res.locals.user;

  const pic = new Picture({
    owner_id: req.session.passport.user,
    pic_path: `../../uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save()
  .then((picture) => {
    User.findById(_id)
    .then((user) => {
      user.pictures = picture.pic_path;

      user.save()
      .then(user => {
        res.redirect('/user');
      });


    });
  })
  .catch((err) => {
    console.log(err);
  });
};
