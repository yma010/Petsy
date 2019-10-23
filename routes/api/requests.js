const express = require("express");
const router = express.Router();
const Request = require("../../model/Request");
const Pet = require("../../model/Pet");
const passport = require("passport");
const isEqual = require("lodash.isequal");

router.get("/me",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ requestingUser: req.user })
      .then(requests => {
        let requestsObj;
        requests.forEach(request => requestsObj[request.id] = request);
        res.json({requestsObj});
      })
  }
);

router.get("/mypets",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ owner: req.user })
      .then(requests => {
        let requestsObj;
        requests.forEach(request => requestsObj[request.id] = request);
        res.json({ requestsObj });
      })
  }
);

router.post("/:petId",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Pet.findOne({ _id: req.params.petId })
      .populate("owner")
      .then(pet => {

        if (pet.owner.id === req.user.id) {
          return res.status(400).json({
            owner: "Owner cannot request their own pet"
          });
        }

        Request.findOne({ pet, requestingUser: req.user })
          .then(request => {
            if (request) {
              res.status(400).json({
                user: "This request has already been made"
              })
            } else {
              const newRequest = new Request({
                pet,
                requestingUser: req.user,
                owner: pet.owner
              });

              newRequest.save()
                .then(request => res.json(request))
                .catch(err => console.log(err))
            }
          })
      })
      .catch(err => res.status(404).json({
        pet: "Pet not found"
      }))
  });

router.delete("/:petId",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findOneAndRemove({
      requestingUser: req.user,
      pet: req.params.petId
    })
      .then((request) => {

        const response = {
          message: "Request deleted",
          id: request.id
        };

        return res.json(response)
      })
      .catch(err => res.status(500).json(err))
  });

router.patch("/:requestId/approve",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findOneAndUpdate({pet: req.params.requestId, owner: req.user, status: "pending"},
      {status: "approved"},
      {new: true})
        .then(approvedRequest => {
          Request.find({ pet: approvedRequest.pet, status: "pending" })
              .then(otherRequests => {
                let changedRequests = {};
                let deniedPromises = [];
                otherRequests.forEach(otherRequest => {
                  otherRequest.status = "denied";
                   deniedPromises.push(otherRequest.save()
                    .then(deniedRequest => {
                      changedRequests[deniedRequest.id] = deniedRequest._doc;
                    }));
                });
                Promise.all(deniedPromises)
                  .then(() => {
                    changedRequests[approvedRequest.id] = approvedRequest;
                    res.json(changedRequests);
                  })
              })
                .catch(err => res.status(500).json({
                  test: "test1"
                }))
        })
          .catch(err => res.status(500).json({
            request: "Something went wrong"
          }))
  });

module.exports = router;