const express = require("express");
const router = express.Router();
const Pet = require("../../model/Pet");

router.get("/test", (req, res) => res.json({
  msg: "This is the pets route"
}));

router.get("/index", (req, res) => {
  Pet.find({})
    .then(pets => {
      if (!pets) {
        errors.pets = "No Pets Found!"
        return res.status(404).json(errors)
      } else {
        res.json(pets);
      }
    })
})

module.exports = router;