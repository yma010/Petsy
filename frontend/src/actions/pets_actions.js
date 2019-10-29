import * as APIPetUtil from "../util/pets_api_util";

export const RECEIVE_ALL_PETS = "RECEIVE_ALL_PETS";
export const RECEIVE_PET = "RECEIVE_PET";

export const receiveAllPets = (pets) => ({
  type: RECEIVE_ALL_PETS,
  pets
});

export const receivePet = (data) => {
  let pet;
  let user;
  if (data.data) {
    pet = data.data.pet;
    user = data.data.user ? data.data.user : {};
  } else {
    pet = data.pet;
    user = data.user;
  }
  return {
  type: RECEIVE_PET,
  pet,
  user,
  status: 200
}};

export const fetchPets = (searchParams = "") => dispatch => {
  APIPetUtil.fetchPets(searchParams)
    .then(pets => dispatch(receiveAllPets(pets)))
};

export const fetchPet = pet => {
  return dispatch => {
    APIPetUtil.fetchPet(pet)
      .then(data => dispatch(receivePet(data)));
  };
}

export const createPet = (data) => dispatch => {
  console.log(data);
  return APIPetUtil.createPet(data)
    .then(pet => dispatch(receivePet(pet)))
    .catch(err => console.log(err))
};

export const updatePet = (data) => dispatch => {
  return APIPetUtil.updatePet(data)
    .then(pet => dispatch(receivePet(pet)))
    .catch(err => console.log(err))
};