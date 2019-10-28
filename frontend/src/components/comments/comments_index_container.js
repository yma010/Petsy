import { connect } from "react-redux";
import { fetchComments } from "../../actions/comments_actions";
import CommentsIndex from "./comments_index";
import { withRouter } from "react-router-dom";

const msp = (state, { match: { params: { petId } } }) => ({
  comments: state.entities.pets[petId].comments.map(commentId => (
    state.entities.comments[commentId]
  )),
  users: state.entities.users
});

const mdp = (dispatch, { match: { params: { petId } } }) => ({
  fetchComments: () => dispatch(fetchComments(petId))
});

const CommentsIndexContainer = withRouter(connect(msp, mdp)(CommentsIndex));

export default CommentsIndexContainer;