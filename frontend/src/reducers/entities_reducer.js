import { combineReducers } from 'redux';
// import usersReducer from './users_reducer';
import petsReducer from './pets_reducer';
import receivedRequests from "./received_requests_reducer";
import sentRequests from "./sent_requests_reducer";
import users from "./users_reducer";

export default combineReducers({
  // users: usersReducer,
  pets: petsReducer,
  users,
  receivedRequests,
  sentRequests
});
