const express = require("express");
const router = express.Router();
const Comment = require("../../model/Comment");
const passport = require("passport");
const { formatCommentsData, formatUsersData } = require("./api_util");

router.get("/:petId", (req, res) => {
  let { petId } = req.params;
  Comment.find({pet: petId})
    .populate("author")
    .then(comments => {
      let users = {};
      let comments = {};
      comments.map(comment => {
        let { author } = comment.author;
        comments[comment.id] = formatCommentsData(comment);
        users[author.id] = formatUser
      });
      res.json({
        comments: ,
        users: 
      })
    })
});

module.exports = router;