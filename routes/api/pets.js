const express = require("express");
const router = express.Router();
const Pet = require("../../model/Pet");
const passport = require("passport");
const ObjectID = require('mongodb').ObjectID;

router.get("/test", (req, res) => res.json({
  msg: "This is the pets route"
}));

router.get("/index", (req, res) => {
  Pet.find({})
    .then(pets => {
        res.json(pets);
    })
});

router.get("/:id", (req, res) => {
  let id = req.params.id;

  Pet.findById(id, function(err, pet) {
     res.json(pet)
  });
});

router.post("/register",
  passport.authenticate('jwt', { session: false }),  
(req, res) => {
  const newPet = new Pet({
    name: req.body.name,
    species: req.body.species,
    sex: req.body.sex,
    color: req.body.color,
    weight: req.body.weight,
    adoptable: req.body.adoptable,
    price: req.body.price,
    owner: req.user
  });

  newPet.save()
  .then(pet => res.json(pet))
  .catch(err => console.log(err))
});


router.put("/edit/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  let petValues = req.body;
  let pet_id = req.params.id;
  Pet.updateOne({ _id: pet_id }, petValues, function(err) {
    if (!err) {
      console.log("Pet updated!");
    } else {
      console.log("Pet failed to update - check params");
    }
  })
  res.json(petValues);
});


module.exports = router;