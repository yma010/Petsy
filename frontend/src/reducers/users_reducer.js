import { merge } from "lodash";
import { RECEIVE_SENT_REQUESTS, RECEIVE_SENT_REQUEST, RECEIVE_RECEIVED_REQUESTS } from "../actions/requests_actions";


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
    default:
      return state;
  }
};