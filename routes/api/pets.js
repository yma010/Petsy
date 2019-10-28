const express = require("express");
const router = express.Router();
const Pet = require("../../model/Pet");
const passport = require("passport");
const ObjectID = require('mongodb').ObjectID;
const formatPetsData = require("./api_util").formatPetsData;
const validatePetInput = require("../../validations/pet");

router.get("/test", (req, res) => res.json({
  msg: "This is the pets route"
}));

router.get("/index", (req, res) => {
  Pet.find({})
    .then(pets => {
      let petsObj = {};
      pets.forEach(pet => petsObj[pet._id] = formatPetsData(pet));
      res.json(petsObj);
    })
});

router.get("/:id", (req, res) => {
  let id = req.params.id;

  Pet.findById(id, function (err, pet) {
    // console.log(pet);
    res.json(formatPetsData(pet))
  });
});

router.post("/register",
  passport.authenticate('jwt', { session: false }), (req, res) => {
  
  const { errors, isValid } = validatePetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newPet = new Pet({
    name: req.body.name,
    species: req.body.species,
    sex: req.body.sex,
    color: req.body.color,
    weight: req.body.weight,
    adoptable: req.body.adoptable,
    image: req.body.image,
    price: req.body.price,
    owner: req.user
  });

  newPet.save()
  .then(pet => res.json(pet))
  .catch(err => console.log(err))
});


router.put("/edit/:id", (req, res) => {
  let petValues = req.body;
  let pet_id = req.body.id;
  // console.log(req.body)
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