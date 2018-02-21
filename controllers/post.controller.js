const Post = require('../models/posts.model');
const Attachment = require('../models/attachments.model');
const moment = require('moment');
const fs = require('fs');
const upload = require('../config/config.dropbox');


module.exports.addPost = (req, res, next) => {
  const id = req.params.id;

  if (typeof req.file === 'undefined') {
    const newPost = {
      owner_id: id,
      message: req.body.message,
      date: moment().format('lll')
    };

    post = new Post(newPost);

    post.save()
    .then((post) => {
      console.log('saving post without images');
      res.redirect('/user');
    }).catch((err) => {
      console.log(err);
    });
  } else {
    const newAtt = {
      owner_id: id,
      pic_path: `../../uploads/posts/${req.file.filename}`,
      pic_name: req.file.originalname
    };

    attachment = new Attachment(newAtt);

    attachment.save()
    .then((picture) => {
      const newPost = {
        picture_id: picture.pic_path,
        owner_id: req.session.passport.user,
        message: req.body && req.body.message || '',
        date: moment().format('lll')
      };

      post = new Post(newPost);

      post.save()
      .then(() => {
        console.log('saving post WITH image');
        res.redirect('/user');
      });
    }).catch((err) => {
      console.log(err);
    });
  };
};

module.exports.updatePost = (req, res, next) => {
  const user = res.locals.user;
  const post = req.params;

  Post.findById(post.id)
  .then(post => {
    console.log(post.likes.length);
    if (post.likes.length === 0) {
      console.log('first like');
      post.likes.push(user.id);
      post.likesNumber += 1;
      post.save();
      res.redirect(`/profile/${user.id}`);
    } else {
      console.log('wtf');
      post.likes.forEach((like) => {
        if (user.id == like) {
          post.likesNumber -= 1;
          for (var i = post.likes.length-1; i>=0; i--) {
              if (post.likes[i] == like) {
                  post.likes.splice(i, 1);
              };
          };
          post.save();
          res.redirect(`/profile/${user.id}`);
        } else {
          post.likes.push(user.id);
          post.likesNumber += 1;
          post.save();
          res.redirect(`/profile/${user.id}`);
        }
      });
    }
  })
  .catch((err) => console.log(err));
};
