const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultURL = [
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/bull.png", 
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/chick.png" ,
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/crab.png", 
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/fox.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/hedgehog.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/hippopotamus.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/koala.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/lemur.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/pig.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/tiger.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/whale.png",
  "https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/png/zebra.png"
];


const UserSchema = new Schema({
  username: {
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
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'pets'
  }],
  image:{
    type: String,
    default: defaultURL[Math.floor(Math.random() * 11)]
  },
  date: {
    type: Date,
    default: Date.now
  }
})
const User = mongoose.model("users", UserSchema);

module.exports = User;