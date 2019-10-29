import { merge } from "lodash";
import { RECEIVE_SENT_REQUESTS, RECEIVE_SENT_REQUEST, RECEIVE_RECEIVED_REQUESTS } from "../actions/requests_actions";
import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from "../actions/comments_actions";
import { RECEIVE_PET } from "../actions/pets_actions";


export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SENT_REQUESTS:
      newState = merge({}, state, action.users);
      return newState;
    case RECEIVE_SENT_REQUEST:
      newState = merge({}, state, {[action.owner.id]: action.owner});
      return newState;
    case RECEIVE_RECEIVED_REQUESTS:
      newState = merge({}, state, action.users);
      return newState;
    case RECEIVE_COMMENTS:
      newState = merge({}, state, action.users);
      return newState;
    case RECEIVE_COMMENT:
      if (action.user) {
        newState = merge({}, state, {[action.user.id]: action.user});
        return newState;
      } else {
        return state;
      }
    case RECEIVE_PET:
      newState = merge({}, state, {[action.user.id]: action.user});
      return newState;
    default:
      return state;
  }
};