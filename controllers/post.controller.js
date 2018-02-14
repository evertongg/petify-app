const Post = require('../models/posts.model');
const moment = require('moment');

module.exports.addPost = (req, res, next) => {
  const id = req.params.id;
  const newPost = {
    owner_id: id,
    message: req.body.message,
    date: moment().format('lll')
  };

  post = new Post(newPost);
  post.save()
  .then(() => {
    console.log('post saved');
    res.redirect('/user');
  }).catch((err) => {
    console.log(err);
  });
};
