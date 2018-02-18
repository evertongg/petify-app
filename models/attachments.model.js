const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const attachmentSchema = new Schema({
  post_id: String,
  name: String,
  pic_path: String,
  pic_name: String
  }, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Attachment = mongoose.model("Attachment", attachmentSchema);
module.exports = Attachment;
