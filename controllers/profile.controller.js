const User = require('../models/user.model');
const Post = require('../models/posts.model');
const moment = require('moment');


module.exports.show = (req, res, next) => {
  const {id} = req.params;
  User.findById(id)
  .then((user) => {
    // Find posts of user
      Post.find({owner_id: id})
      .then((posts) => {
        res.render('profile/profile', {
          user,
          posts: posts,
          moment: moment(posts.date).format('lll')
        });
      })
      .catch(err => console.log(err));

    res.render('profile/profile', {
      user,
      posts: posts
    });
  })
  .catch(err => {
    console.log(err);
  });
};

module.exports.like = (req, res, next) => {
  console.log('doing like');
  const id = req.params.id;
  const owner_id = req.session.id;

  Post.findById(id)
  .then((post) => {
    console.log(post);

    post.save()
    .then(post => {
      req.flash('success_msg', 'Thanks for your like!');
      res.send('saving like')
    });
  })
  .catch(err => console.log(err));
};
