import { merge } from "lodash";
import { APPROVE_RECEIVED_REQUEST, DENY_RECEIVED_REQUEST, RECEIVE_RECEIVED_REQUESTS } from "../actions/requests_actions";


export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_RECEIVED_REQUESTS:
      newState = merge({}, state, action.receivedRequests);
      return newState;
    case APPROVE_RECEIVED_REQUEST:
      newState = merge({}, state);
      delete newState[Object.keys(action.approved)[0]];
      Object.keys(action.denied).forEach(deniedId => {
        delete newState[deniedId];
      });
      return newState;
    case DENY_RECEIVED_REQUEST:
      newState = merge({}, state);
      delete newState[action.deniedRequest]
      return newState;
    default:
      return state;
  }
};