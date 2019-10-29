import { connect } from "react-redux";
import { fetchComments } from "../../actions/comments_actions";
import CommentsIndex from "./comments_index";
import { withRouter } from "react-router-dom";

const msp = (state, { match: { params: { petId } } }) => ({
  comments: state.entities.pets[petId].comments.map(commentId => {
    let comment = state.entities.comments[commentId];
    if (comment) {
      comment = Object.assign({}, comment);
      comment.author = state.entities.users[comment.author];
      comment.formatPosted = new Date(comment.posted)
        .toDateString()
        .split(" ")
        .slice(1)
        .map((term, idx) => {
          if (idx === 1) {
            return term + ",";
          } else {
            return term;
          }
        })
        .join(" ");
      return comment;
    } else {
      return null;
    }
  }).sort((a, b) => Date.parse(b.posted) - Date.parse(a.posted) )
});

const mdp = (dispatch, { match: { params: { petId } } }) => ({
  fetchComments: () => dispatch(fetchComments(petId))
});

const CommentsIndexContainer = withRouter(connect(msp, mdp)(CommentsIndex));

export default CommentsIndexContainer;