const express = require("express");
const router = express.Router();
const Pet = require("../../model/Pet");
const passport = require("passport");
const ObjectID = require('mongodb').ObjectID;
const { formatPetsData, formatUsersData } = require("./api_util");
const validatePetInput = require("../../validations/pet");

const parseSearch = ({names, species, colors, sexes}) => {
  let searchParams = [];
  if (names) {
    searchParams.push({ name: { $regex: new RegExp(names.join("|"), "i") } });
  }
  if (species) {
    searchParams.push({ species: { $regex: new RegExp(species.join("|"), "i") } });
  }
  if (colors) {
    searchParams.push({ color: { $regex: new RegExp(colors.join("|"), "i") } });
  }
  if (sexes) {
    searchParams.push({ sex: { $regex: new RegExp(sexes.join("|"), "i") } });
  }
  if (searchParams.length !== 0) {
    return { $or: searchParams }
  }
  return {};
};

router.get("/test", (req, res) => res.json({
  msg: "This is the pets route"
}));

router.get("/index", (req, res) => {
  let searchParams = parseSearch(req.query);
  Pet.find(searchParams)
    .then(pets => {
      let petsObj = {};
      pets.forEach(pet => petsObj[pet._id] = formatPetsData(pet));
      res.json(petsObj);
    })
});

router.get("/:id", (req, res) => {
  let id = req.params.id;

  Pet.findById(id)
    .populate("owner")
    .then((pet) => {
    res.json({
      pet: formatPetsData(pet),
      user: formatUsersData(pet.owner)
    })
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
  .then(pet => res.json({
    pet: formatPetsData(pet),
    user: undefined
  }))
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