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
     lat: Number,
     lng: Number,
     currentLocation: {
       lat: Number,
       lng: Number,
     }
  },
  city: String,
  animaltype: {
    type: String,
    required: true
  },
  breed: String,
  sex: {
    type: String,
    required: true
  },
  pictures: String,
  birthdate: String,
  character: [String],
  bio: String,
  skills: [String],
  followers: [{
    user_id: String,
    petname: String,
    pic: String,
    city: String,
    location: {
       lat: Number,
       lng: Number,
    }
    }],
  followersNumber: {
      type: Number,
      default: 0
    },
  following: [{
    user_id: String,
    petname: String,
    pic: String,
    city: String,
    location: {
       lat: Number,
       lng: Number,
    }
    }],
  followingNumber: {
    type: Number,
    default: 0
  },
  posts: [String],
  paws: Number,
  paw_ids: [String]
});


// Encrypting password
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          next();
        });
    })
    .catch(error => next(error));
});

// Checking if password is correct
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
