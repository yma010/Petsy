const ObjectId = require("mongoose").Types.ObjectId;

const formatPetsData = pet => {
  return {
  id: pet.id,
  price: parseFloat(pet.price.toString()),
  image: pet.image,
  name: pet.name,
  sex: pet.sex,
  image: pet.image,
  color: pet.color,
  weight: parseFloat(pet.weight.toString()),
  owner: ObjectId.isValid(pet.owner) ? pet.owner : pet.owner.id,
  comments: ObjectId.isValid(pet.comments[0]) ?
    pet.comments : pet.comments.map(comment => comment.id)
}};

const formatUsersData = user => ({
  id: user.id,
  username: user.username,
  pets: ObjectId.isValid(user.pets) ?
    user.pets : user.pets.map(pet => pet.id),
  image: user.image
});

const formatCommentsData = comment => ({
  id: comment.id,
  pet: ObjectId.isValid(comment.pet) ? comment.pet : comment.pet.id,
  author: ObjectId.isValid(comment.author) ? comment.author : comment.author.id,
  body: comment.body,
  posted: comment.posted
})

module.exports = {
  formatPetsData,
  formatUsersData,
  formatCommentsData
};
