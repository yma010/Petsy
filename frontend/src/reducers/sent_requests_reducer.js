
import { RECEIVE_SENT_REQUESTS, RECEIVE_SENT_REQUEST, REMOVE_SENT_REQUEST } from "../actions/requests_actions";
import { merge } from "lodash";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SENT_REQUESTS:
      newState = merge({}, action.sentRequests);
      return newState;
    case RECEIVE_SENT_REQUEST:
      newState = merge({}, state, {[action.sentRequest.id]: action.sentRequest});
      return newState;
    case REMOVE_SENT_REQUEST:
      newState = merge({}, state);
      delete newState[action.sentRequestId];
      return newState;
    default:
      return state;
  }
}