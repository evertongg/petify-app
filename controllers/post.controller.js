const Post = require('../models/posts.model');
const Attachment = require('../models/attachments.model');
const moment = require('moment');
const fs = require('fs');
const upload = require('../config/config.dropbox');

function posts (req, res, next) {
  Post.find({})
  .then(posts => res.render('index', {posts, title: 'dropbox-upload'}))
  .catch(err => next(err));
}

function createPost (req, res, next) {
  fs.readFile(req.file.path, (err, fileContent) => {
    upload.getUrl(req.file, fileContent)
    .then(url => {
      const post = new Post({
        title: req.body.title,
        imageUrl: `https://dl.dropboxusercontent.com/s${url}`
      })
      post.save()
      .then(() => res.redirect('/'))
    })
  })
}

module.exports = {
  posts,
  createPost
}


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
        message: req.body.message,
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

// module.exports.updatePost = (req, res, next) => {
//   const user = res.locals.user
//   Post.findById(req.params.id)
//   .then(post => {
//     let like = false;
//     post.likes.forEach(userId => {
//       if (userId == user._id) {
//         like = true
//       }
//     })
//     if (!like) {
//       post.likes.push(user._id)
//       Post.findByIdAndUpdate(req.params.id, post, {new: true})
//       .then(post => res.redirect(`/profile/${user._id}`))
//       .catch(err => err)
//     }
//   })
// }
