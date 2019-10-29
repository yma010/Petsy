const express = require("express"),
      router = express.Router();

const upload = require('../../services/image_upload');

const multiUpload = upload.array('image[]', 5);
const singleUpload = upload.single('image');

router.post('/pet-upload', function(req, res){
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
        imgLocationArray.push(fileLocation)
      }
   
    return res.json({
      'imageUrl': imgLocationArray
    })};
  });
});


router.post('/user-upload', function (req, res) {

  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{
          title: 'File Upload Error',
          detail: err.message
        }]
      });
    }
    
    return res.json({
      'imageUrl': req.file.location
    });
  });
});

module.exports = router;