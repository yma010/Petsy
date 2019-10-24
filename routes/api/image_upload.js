const express = require("express"),
      router = express.Router();

const upload = require('../../services/image_upload'),
      Image = require('../../model/Image');


const singleUpload = upload.single('image');

router.post('/image-upload', function(req, res){

  singleUpload(req, res, function(err) {
    res.json(req.file.location);
    //TODO: FIX BELOW
    const newImageUploaded = {
      description: req.body.description,
      fileLink: req.file.location,
      s3_key: req.file.originalname,
      pet: req.pet
    }

    const image = new Image(newImageUploaded);
    image.save(function(err, newImage) {
      if (err) {
        throw err;
      }
    })
  });
});

module.exports = router;