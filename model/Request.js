const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  pet: {
    type: Schema.Types.ObjectId,
    ref: "pets",
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  requestingUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  status: {
    type: String,
    default: "pending"
  }
});

const Request = mongoose.model("requests", RequestSchema);

module.exports = Request;