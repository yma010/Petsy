const express = require("express");
const router = express.Router();
const Comment = require("../../model/Comment");
const Pet = require("../../model/Pet");
const User = require("../../model/User");
const passport = require("passport");
const { formatCommentsData, formatUsersData, formatPetsData } = require("./api_util");
const validateCommentInput = require("../../validations/comments");

router.get("/:petId", (req, res) => {
  let { petId } = req.params;
  Pet.findById(petId)
    .populate("comments")
    .then(pet => {
      let users = {};
      let comments = {};
      let { comments: commentModels } = pet;
      let promises = [];
      commentModels.map(comment => {
        promises.push(User.findById(comment.author)
          .then(author => {
            comments[comment.id] = formatCommentsData(comment);
            users[author.id] = formatUsersData(author);
          }))        
      });
      Promise.all(promises)
        .then(() => {
          return res.json({
            comments,
            users
          })
        })
    })
});

router.post("/:petId",
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newComment = new Comment({
      pet: req.params.petId,
      author: req.user.id,
      body: req.body.body
    });

    Pet.findOne({ _id: req.params.petId })
      .then(pet => {
        newComment.save()
          .then(comment => {
            pet.comments.push(comment.id);
            pet.save()
              .then(() => {
                User.findById(req.user.id)
                  .then(user => {
                    res.json({
                      comment: formatCommentsData(comment),
                      user: formatUsersData(user),
                      pet: formatPetsData(pet)
                    })
                  })
              })
          })
      })
      .catch(err => res.status(404).json({
        comment: "pet not found"
      }));
  });

router.patch("/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user.id},
      { body: req.body.body},
      {new: true })
      .then(comment => {
        res.json({
          comment: formatCommentsData(comment)
        })
      })
      .catch(() => {
        res.status(404).json({
          comment: "Comment not found"
        })
      })
  });

router.delete("/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findOneAndRemove({ _id: req.params.commentId, author: req.user.id})
      .then(comment => {
        Pet.findOneAndUpdate(
          { _id: comment.pet },
          { $pull: { comments: comment.id } }
        )
          .then(() => {
            res.json(formatCommentsData(comment))
          })
      })
      .catch(() => res.status(400).json({
        comment: "You are not the author or this comment does not exist"
      }))
  });

module.exports = router;