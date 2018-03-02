const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  owner_id: String,
  name: String,
  pic_name: String,
  url: String
  }, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Picture = mongoose.model("Picture", pictureSchema);
module.exports = Picture;
