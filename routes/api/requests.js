const express = require("express");
const router = express.Router();
const Request = require("../../model/Request");
const passport = require("passport");

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
    Pet.findOne({ id: req.params.petId })
      .then(pet => {
        if (!pet) {
          return res.status(404).json({
            pet: "Pet not found"
          })
        }

        Request.findOne({ pet, requestingUser: req.user })
          .then(request => {
            if (request) {
              errors
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
  })

module.exports = router;