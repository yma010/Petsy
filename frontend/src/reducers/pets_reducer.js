import { RECEIVE_ALL_PETS } from "../actions/pets_actions";

import { merge } from 'lodash';

export default function( state = {}, action ) {
  Object.freeze(state)

  switch (action.type) {
  case RECEIVE_ALL_PETS:
    return merge({}, state, action.pets)
  default:
    return state;
  };
};