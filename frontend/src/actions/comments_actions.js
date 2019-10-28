import * as APIUtil from "../util/comments_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_NEW_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const receiveComments = ({comments, users}) => ({
  type: RECEIVE_COMMENTS,
  comments,
  users
});

export const receiveComment = ({comment, user}) => ({
  type: RECEIVE_COMMENT,
  comment,
  user
});

export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
});

export const fetchComments = petId => dispatch => {
  return APIUtil.requestComments(petId)
    .then(response => {
      let { data } = response;
      dispatch(receiveComments(data));
    })
};

export const createComment = (petId, comment) => dispatch => {
  return APIUtil.createComment(petId, comment)
    .then(response => {
      let { data } = response;
      dispatch(receiveComment(data));
    })
};

export const editComment = (commentId, data) => dispatch => {
  return APIUtil.editComment(commentId, data)
    .then(response => {
      let { data } = response;
      dispatch(receiveComment(data))
    });
}

export const deleteComment = commentId => dispatch => {
  return APIUtil.deleteComment(commentId)
    .then(response => {
      let commentId = response.data.id;
      dispatch(removeComment(commentId));
    })
}
