import { RECEIVE_ALL_PETS, RECEIVE_PET } from "../actions/pets_actions";

import { merge } from 'lodash';

export default function( state = {}, action ) {
  Object.freeze(state)

  switch (action.type) {
  case RECEIVE_ALL_PETS:
    return merge({}, state, action.pets)
  case RECEIVE_PET:
    const newState = merge({}, state);
    newState[action.pets.id] = action.pets;
    return newState;
  default:
    return state;
  };
};