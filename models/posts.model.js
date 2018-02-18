const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  likes: [String]

});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
