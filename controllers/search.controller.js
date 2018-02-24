const User = require('../models/user.model');
const Picture = require('../models/picture.model');
const Post = require('../models/posts.model');

module.exports.showResults = (req, res, next) => {
const search = req.body.search;

  User.find({'petname' : {
    $regex: new RegExp('^' + search.toLowerCase(), 'i')}
  })
  .then((pets) => {
    Post.find({'hashtag' : search})
    .then((posts) => {
      console.log([...posts, ...pets])
      res.render('search', {
        search: search,
        results: [...posts, ...pets]
      });
    })

  })
  .catch((err) => {
    console.log(err);
  });
  
  
};


module.exports.show = (req, res) => {
  let message = 'No search found';

  res.render('search', {
    search: message
  });
};
