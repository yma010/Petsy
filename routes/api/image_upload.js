const express = require("express"),
      router = express.Router();

const upload = require('../../services/image_upload');

const multiUpload = upload;

router.post('/image-upload', function(req, res){
  multiUpload(req, res, function (err) {
  if (err) {
    return res.status(422).send({
      errors: [{
        title: 'File Upload Error',
        detail: err.message
      }]
    });
  } else{
    let imageArray = req.files,
      fileLocation;

    const imgLocationArray = [];
      for (let i = 0; i < imageArray.length; i++){
        fileLocation = imageArray[i].location;
        imgLocationArray.push(fileLocation) //iterate through the array of files and grab location
      }
   
    return res.json({
      'imageUrl': imgLocationArray //return the array of location urls from S3
    })};
  });
});

module.exports = router;