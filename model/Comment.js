const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  pet: {
    type: Schema.Types.ObjectId,
    ref: "pets",
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;