const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    required: false
  },
  date: {
    type: String
  },
  likes: Number,
  followers_ids: [String],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
