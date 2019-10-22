const express = require("express");
const router = express.Router();
const Pet = require("../../model/Pet");

router.get("/test", (req, res) => res.json({
  msg: "This is the pets route"
}));

router.get("/index", (req, res) => {
  Pet.find({})
    .then(pets => {
        res.json(pets);
    })
})

router.post("/register?=pet", (req, res) => {})

module.exports = router;