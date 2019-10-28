const ObjectId = require("mongoose").Types.ObjectId;

const formatPetsData = pet => {
  return {
  id: pet.id,
  price: parseFloat(pet.price.toString()),
  name: pet.name,
  sex: pet.sex,
  image: pet.image,
  color: pet.color,
  weight: parseFloat(pet.weight.toString()),
  owner: ObjectId.isValid(pet.owner)  ? pet.owner : pet.owner.id
}};

const formatUsersData = user => ({
  id: user.id,
  username: user.username,
  image: user.image,
  pets: user.pets
});

module.exports = {
  formatPetsData,
  formatUsersData
};
