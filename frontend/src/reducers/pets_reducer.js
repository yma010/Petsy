import { RECEIVE_ALL_PETS, RECEIVE_PET } from "../actions/pets_actions";

import { merge } from 'lodash';
import { RECEIVE_RECEIVED_REQUESTS, RECEIVE_SENT_REQUESTS, RECEIVE_SENT_REQUEST } from "../actions/requests_actions";
import { RECEIVE_COMMENT } from "../actions/comments_actions";

export default function( state = {}, action ) {
  Object.freeze(state)
  let newState;
  switch (action.type) {
  case RECEIVE_ALL_PETS:
    return merge({}, action.pets)
  case RECEIVE_PET:
    newState = merge({}, state);
    newState[action.pet.id] = action.pet;
    return newState;
  case RECEIVE_RECEIVED_REQUESTS:
    newState = merge({}, state, action.pets);
    return newState;
  case RECEIVE_SENT_REQUESTS:
    newState = merge({}, state, action.pets);
    return newState;
  case RECEIVE_SENT_REQUEST:
    newState = merge({}, state, {[action.pet.id]: action.pet});
    return newState;
  case RECEIVE_COMMENT:
    if (action.pet) {
      newState = merge({}, state, { [action.pet.id]: action.pet });
      return newState;
    } else {
      return state;
    }
  default:
    return state;
  };
};