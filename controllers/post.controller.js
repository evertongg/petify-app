// import { likePost } from './like.controller';

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

module.exports.updatePost = (req, res, next) => {
  const user = res.locals.user
  Post.findById(req.params.id)
  .then(post => {
    let like = false;
    post.likes.forEach(userId => {
      if (userId == user._id) {
        like = true
      }
    })
    if (!like) {
      post.likes.push(user._id)
      Post.findByIdAndUpdate(req.params.id, post, {new: true})
      .then(post => res.redirect(`/profile/${user._id}`))
      .catch(err => err)
    } 
  })
}
