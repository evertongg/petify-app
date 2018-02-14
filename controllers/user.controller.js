const User = require('../models/user.model');
const Post = require('../models/posts.model');


module.exports.show = (req, res) => {
  console.log(res.locals.user);
  const {_id} = res.locals.user;

// Find user
  User.findById(_id)
  .then((user) => {
    // Find posts of user
      Post.find({owner_id: user.id})
      .then((posts) => {
        res.render('user/user', {
          posts: posts
        });
      })
      .catch(err => console.log(err));

    res.render('user/user', {
      user,
      posts
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
