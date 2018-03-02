const Post = require('../models/posts.model');
const Attachment = require('../models/attachments.model');
const moment = require('moment');
const fs = require('fs');
const upload = require('../config/config.dropbox');
const findHashtags = require('find-hashtags');

// NOT DEPLOYED AT THE MOMENT
function posts (req, res, next) {
  Post.find({})
  .then(posts => res.render('index', {posts, title: 'dropbox-upload'}))
  .catch(err => next(err));
}

// CREATE AND ADD POST to post model
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

module.exports.viewPost = (req, res, next) => {
  const id = req.params.id;
    Post.findById(id)
    .then((post) => {
      console.log("hashhhh")
      res.render('post', {
        post
    });
  });

}


module.exports.show = (req, res, next) => {
  const {id} = req.params;

  User.findById(id)
  .then((user) => {
      Post.find({owner_id: id})
      .then((posts) => {
        Picture.find({owner_id: user._id})
        .then((pictures) => {
          res.render('profile/profile', {
            user,
            posts,
            pictures,
            moment: moment(posts.date).format('lll')
          });
      });
  })
  .catch(err => {
    console.log(err);
  });
});
};

// ADDING A NEW POST in the user profile
module.exports.addPost = (req, res, next) => {
  const id = req.params.id;
  const hashtags = findHashtags(req.body.message)

  if (typeof req.file === 'undefined') {
    const newPost = {
      owner_id: id,
      message: req.body.message,
      hashtag: hashtags,
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

// LIKES functionality
module.exports.updatePost = (req, res, next) => {
  const user = res.locals.user;
  const post = req.params;

  Post.findById(post.id)
  .then(post => {
    if (post.likes.length === 0) {
      post.likes.push(user.id);
      post.likesNumber += 1;
      post.save();
      res.redirect(`/profile/${post.owner_id}`);
    } else {
      post.likes.forEach((like) => {
        if (user.id == like) {
          for (var i = post.likes.length-1; i>=0; i--) {
              if (post.likes[i] == like) {
                  post.likesNumber -= 1;
                  post.likes.splice(i, 1);
              };
          };
          post.save();
          res.redirect(`/profile/${post.owner_id}`);
        } else {
          post.likes.push(user.id);
          post.likesNumber += 1;
          post.save();
          res.redirect(`/profile/${post.owner_id}`);
        }
      });
    }
  })
  .catch((err) => console.log(err));
};


// COMMENT functionality
module.exports.updateComment = (req, res, next) => {
  const user = res.locals.user;
  const post = req.params;

  const newComment = {
    message: req.body.comment,
    owner_id: user.id,
    owner_name: user.petname,
    date: moment().format('lll')
  };

  Post.findById(post.id)
  .then(post => {
    post.comments.push(newComment);
    post.save();
    res.redirect(`/profile/${post.owner_id}`);
  })
  .catch((err) => console.log(err));
};
