import * as APIUtil from "../util/pets_api_util";

export const RECEIVE_ALL_PETS = "RECEIVE_ALL_PETS";

export const receiveAllPets = (pets) => ({
  type: RECEIVE_ALL_PETS,
  pets
});

export const fetchPets = () => dispatch => {
  APIUtil.fetchPets()
    .then(pets => dispatch(receiveAllPets(pets)))
};