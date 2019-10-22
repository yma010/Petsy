import { combineReducers } from 'redux';
// import usersReducer from './users_reducer';
import petsReducer from './pets_reducer';


export default combineReducers({
  // users: usersReducer,
  pets: petsReducer 
});
