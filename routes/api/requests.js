const express = require("express");
const router = express.Router();
const Request = require("../../model/Request");
const Pet = require("../../model/Pet");
const passport = require("passport");

const formatRequest = data => {
  let { pet, owner, requestingUser } = data;
  return {
  id: data.id,
  status: data.status,
  pet,
  owner,
  requestingUser
}};

const formatGetRequest = data => {
  let { pet, owner, requestingUser } = data;
  return {
    id: data.id,
    status: data.status,
    pet: pet.id,
    owner: owner.id,
    requestingUser: requestingUser.id
}};

router.get("/me",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ requestingUser: req.user })
      .populate("pet")
      .populate("requestingUser")
      .populate("owner")
      .then(requests => {
        let sentRequests = {};
        sentRequests.sentRequests = {};
        sentRequests.pets = {};
        sentRequests.users = {};
        requests.forEach(request => {
          let { pet, owner, requestingUser } = request;
          sentRequests.sentRequests[request.id] = formatGetRequest(request);
          sentRequests.pets[pet.id] = {
            id: pet.id,
            name: pet.name,
            sex: pet.sex,
            color: pet.color,
            weight: parseFloat(pet.weight.toString()),
            owner: pet.owner
          };
          sentRequests.users[requestingUser.id] = {
            id: requestingUser.id,
            username: requestingUser.username,
            pets: requestingUser.pets
          };
          sentRequests.users[owner.id] = {
            id: owner.id,
            username: owner.username,
            pets: owner.pets
          };
        });
        res.json(sentRequests);
      })
  }
);

router.get("/mypets",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.find({ owner: req.user, status: "pending" })
      .then(requests => {
        let receivedRequests = {};
        receivedRequests.receivedRequests = {};
        receivedRequests.pets = {};
        receivedRequests.users = {};
        requests.forEach(request => {
          let { pet, owner, requestingUser } = request;
          receivedRequests.receivedRequests[request.id] = formatGetRequest(request);
          receivedRequests.pets[pet.id] = {
            id: pet.id,
            name: pet.name,
            sex: pet.sex,
            color: pet.color,
            weight: parseFloat(pet.weight.toString()),
            owner: pet.owner
          };
          receivedRequests.users[requestingUser.id] = {
            id: requestingUser.id,
            username: requestingUser.username,
            pets: requestingUser.pets
          };
          receivedRequests.users[owner.id] = {
            id: owner.id,
            username: owner.username,
            pets: owner.pets
          };
        });
        res.json(receivedRequests);
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
                .then(request => res.json(formatRequest(request)))
                .catch(err => res.status(500).json({
                  request: "Request failed, please try again"
                }))
            }
          })
      })
      .catch(err => res.status(404).json({
        request: "Pet not found"
      }))
  });

router.delete("/:requestId",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findOneAndRemove({
      requestingUser: req.user,
      _id: req.params.requestId
    })
      .then((request) => {

        const response = {
          message: "Request deleted",
          id: request.id
        };

        return res.json(response)
      })
      .catch(err => res.status(500).json({
        request: "Request does not exist"
      }))
  });

router.patch("/:requestId/approve",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findOneAndUpdate({_id: req.params.requestId , owner: req.user, status: "pending"},
      {status: "approved"},
      {new: true})
        .then(approvedRequest => {
          Request.find({ pet: approvedRequest.pet, status: "pending" })
              .then(otherRequests => {
                let changedRequests = {};
                changedRequests.approved = {};
                changedRequests.denied = {};
                changedRequests.approved[approvedRequest.id] = formatRequest(approvedRequest);
                let deniedPromises = [];
                otherRequests.forEach(otherRequest => {
                  otherRequest.status = "denied";
                   deniedPromises.push(otherRequest.save()
                    .then(deniedRequest => {
                      changedRequests.denied[deniedRequest.id] = formatRequest(deniedRequest._doc);
                    }));
                });
                Promise.all(deniedPromises)
                  .then(() => {
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

router.patch("/:requestId/deny",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Request.findOneAndUpdate({_id: req.params.requestId, owner: req.user},
      {status: "denied"},
      {new: true})
      .then(request => {
        return res.json({
          [request.id]: formatRequest(request)
        });
      })
      .catch(err => res.status(500).json({
        request: "Something went wrong"
      }))
  });

module.exports = router;