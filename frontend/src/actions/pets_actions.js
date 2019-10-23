import * as APIUtil from "../util/pets_api_util";

export const RECEIVE_ALL_PETS = "RECEIVE_ALL_PETS";
export const RECEIVE_PET = "RECEIVE_PET";

export const receiveAllPets = (pets) => ({
  type: RECEIVE_ALL_PETS,
  pets
});

export const receivePet = (pet) => ({
  type: RECEIVE_PET,
  pet
});

export const fetchPets = () => dispatch => {
  APIUtil.fetchPets()
    .then(pets => dispatch(receiveAllPets(pets)))
};

export const fetchPet = pet => {
  return dispatch => {
    APIUtil.fetchPet(pet)
      .then(pet => dispatch(receivePet(pet)));
  };
}

export const createPet = (data) => dispatch => {
  APIUtil.createPet(data)
    .then(pet => dispatch(receivePet(pet)))
    .catch(err => console.log(err))
};