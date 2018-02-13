const Post = require('../models/posts.model');


module.exports.addPost = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  res.send('hola');
};
