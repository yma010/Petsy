const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

aws.config.update({
  secretAccessKey: keys.AWSSecretKey,
  accessKeyId: keys.AWSAccessKey,
  region: keys.AWSRegion
});

const s3 = new aws.S3();


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
    }
  })
})


module.exports = upload;