import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment } from "../../actions/comments_actions";
import CommentForm from "./comment_form";

const msp = (state) => ({
  comment: {
    body: ""
  }
});

const mdp = (dispatch, { match: { params: { petId } } }) => ({
  action: (comment) => {
    dispatch(createComment(petId, comment));
  }
});

const CreateCommentFormContainer = withRouter(connect(msp, mdp)(CommentForm));

export default CreateCommentFormContainer;