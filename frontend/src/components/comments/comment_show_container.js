import { connect } from "react-redux";
import { editComment, deleteComment } from "../../actions/comments_actions";
import CommentShow from "./comment_show";

const msp = (state, { match: { params: { petId } } }) => ({
  currentUser: state.session.user ? state.session.user.id : undefined
});

const mdp = (dispatch) => ({
  editComment: (commentId, comment) => dispatch(editComment(commentId, comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

const CommentShowContainer = connect(msp, mdp)(CommentShow);

export default CommentShowContainer;