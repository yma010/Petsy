const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrement = require("mongoose-sequence")(mongoose);

const ImageSchema = new Schema({
    image_id: {
      type: Number,
      default: 0
    },
    pets: {
      type: Schema.Types.ObjectId,
      ref: 'pets'
    },
    description:{
      type: String,
      required: true
    },
    fileLink: { 
      type: String 
    },
    s3_key: { 
      type: String 
    }
  },
  {
    timestamps: true
  }
);

ImageSchema.plugin(AutoIncrement, { inc_field: "image_id"});

module.exports = mongoose.model("images", ImageSchema)