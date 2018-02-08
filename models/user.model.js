const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  petname: {
    type: String,
    required: true
  },
  ownername: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  animaltype: {
    type: String,
    required: true
  },
  breed: String,
  sex: String,
  pictures: [{
    url: String,
    isProfilePic: Boolean,
    uploaded: Date
    }],
  birthdate: Date,
  character: String,
  bio: String,
  skills: [String],
  followers: [{
    user_id: String,
    petname: String
    }],
  followers_ids: [String],
  following: [{
    user_id: String,
    petname: String
    }],
  posts: [String],
  paws: Number,
  paw_ids: [String]
})

const User = mongoose.model('User', userSchema);
module.exports = User;
