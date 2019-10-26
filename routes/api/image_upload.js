const express = require("express"),
      router = express.Router();

const upload = require('../../services/image_upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function(req, res){

  singleUpload(req, res, function (err) {
  if (err) {
    return res.status(422).send({
      errors: [{
        title: 'File Upload Error',
        detail: err.message
      }]
    });
  }
  debugger;
    return res.json({
      'imageUrl': req.file.location
    });
  });
});

module.exports = router;