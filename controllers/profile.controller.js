const User = require('../models/user.model');
const Post = require('../models/posts.model');
const Picture = require('../models/picture.model');
const Attachment = require('../models/attachments.model');
const moment = require('moment');

//SHOW PUBLIC profile
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

// NOT DEPLOYED AT THE MOMENT 
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
