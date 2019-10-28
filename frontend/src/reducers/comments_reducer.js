import { merge } from "lodash";
import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comments_actions";

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_COMMENTS:
      newState = merge({}, state, action.comments);
      return newState;
    case RECEIVE_COMMENT:
      newState = merge({}, state, {[action.comment.id]: action.comment});
      return newState;
    case REMOVE_COMMENT:
      newState = merge({}, state);
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;