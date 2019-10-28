import { connect } from "react-redux";
import { editComment } from "../../actions/comments_actions";
import CommentForm from "./comment_form";

const mdp = (dispatch, { changeEdit }) => ({
  action: (comment) => {
    dispatch(editComment(comment.id, comment));
    changeEdit(undefined);
  }
});

const EditCommentFormContainer = connect(null, mdp)(CommentForm);

export default EditCommentFormContainer;