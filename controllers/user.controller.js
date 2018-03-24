const User = require('../models/user.model');
const Post = require('../models/posts.model');
const Picture = require('../models/picture.model');
const moment = require('moment');
const geolocation = require('geolocation');
const cloudinary = require('cloudinary');

// SHOW HOMEPAGE after logging in
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

// EDIT PROFILE and save changes in Mongoose
module.exports.saveChanges = (req, res, next) => {
  const {_id} = res.locals.user;
// Find user
  User.findById(_id)
  .then(user => {
    //new value
    user.petname = req.body.petname,
    user.ownername = req.body.ownername,
    user.bio = req.body.bio,
    user.city = req.body.location,
    user.location.lat = req.body.lat,
    user.location.lng = req.body.lng,
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


// ADD PICTURE to userprofile
module.exports.savePic = (req, res) => {
  const {_id} = res.locals.user;
  console.log(req.file.originalname);

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
  });

  cloudinary.uploader.upload(req.file.path, function(result) {
    const pic = new Picture({
      owner_id: req.session.passport.user,
      pic_path: `../../uploads/${req.file.filename}`,
      pic_name: req.file.originalname,
      url: result.url
    });

    pic.save()
    .then((picture) => {
      User.findById(_id)
      .then((user) => {
        user.pictures = picture.url;
        user.save()
        .then(user => {
          res.redirect('/user');
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(result);
});
};

// FOLLOW A USER
module.exports.follow = (req, res) => {
  // Id of the user we want to follow
  const {id} = req.params;
  const sessionId = req.session.passport.user;
// Find the user in the session = currentUser
  User.findByIdAndUpdate(sessionId, {$push: {following: id}})
  .then(function (currentUser) {
    // Find the user we want to follow = user
    User.findByIdAndUpdate(id, {$push: {followers: currentUser._id}})
      .then(function(otherUser) {
        res.redirect(`/profile/${otherUser.id}`);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
};


// CHECK IN AND CHECK OUT functionalities
module.exports.checkIn = (req, res, next) => {
 const {_id} = res.locals.user;
 // Find user
 User.findById(_id)
 .then(user => {
   //new value
   user.location.currentLocation.lat = req.body.locationLat;
   user.location.currentLocation.lng = req.body.locationLng;

   //save edited idea
   user.save()
   .then(user => {
     if (user.location.currentLocation.lat == null) {
       req.flash('error_msg', 'Location not found!');
       res.redirect('/user');
     } else {
       req.flash('success_msg', 'Successfully checked in!');
       res.redirect('/user');
     }
   });
 });
};

module.exports.checkOut = (req, res, next) => {
 const {_id} = res.locals.user;
 // Find user
 User.findById(_id)
 .then(user => {
   //new value
   user.location.currentLocation.lat = null;
   user.location.currentLocation.lng = null;

   //save edited idea
   user.save()
   .then(user => {
     req.flash('success_msg', 'Successfully checked out!');
     res.redirect('/user');
   });
 });
};
