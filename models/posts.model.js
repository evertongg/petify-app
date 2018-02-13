const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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
    required: true
  },
  likes: Number,
  followers_ids: [String],
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
