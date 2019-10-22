const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  adoptable: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0.00
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});


const Pet = mongoose.model("pet", PetSchema);

module.exports = Pet;