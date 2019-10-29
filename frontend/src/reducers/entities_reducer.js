import { combineReducers } from 'redux';
import petsReducer from './pets_reducer';
import receivedRequests from "./received_requests_reducer";
import sentRequests from "./sent_requests_reducer";
import users from "./users_reducer";
import commentsReducer from './comments_reducer';

export default combineReducers({
  pets: petsReducer,
  users,
  receivedRequests,
  sentRequests,
  comments: commentsReducer
});
