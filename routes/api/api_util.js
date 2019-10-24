const ObjectId = require("mongoose").Types.ObjectId;

const formatPetsData = pet => ({
  id: pet.id,
  price: parseFloat(pet.price.toString()),
  name: pet.name,
  sex: pet.sex,
  color: pet.color,
  weight: parseFloat(pet.weight.toString()),
  owner: ObjectId.isValid(pet.owner) ? pet.owner : pet.owner.id
});

const formatUsersData = user => ({
  id: user.id,
  username: user.username,
  pets: user.pets
});

module.exports = {
  formatPetsData,
  formatUsersData
};