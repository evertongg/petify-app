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
  likes: [String],
  likesNumber: {
    type: Number,
    default: 0
  },
  picture_id: [String],
  comments: [{
    message: String,
    owner_id: String,
    owner_name: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
