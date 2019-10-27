const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

AWS.config.update({
  secretAccessKey: keys.AWSSecretKey,
  accessKeyId: keys.AWSAccessKey,
  region: keys.AWSRegion
});

const s3 = new AWS.S3();
debugger; 

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'petsy-cdm-seeds',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
    limits:{ fileSize: 10000000 }
  })
}).array('image[]', 5);


module.exports = upload;