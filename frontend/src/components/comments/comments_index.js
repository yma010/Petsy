import React from "react";
import CommentShowContainer from "./comment_show_container";
import CreateCommentFormContainer from "./create_comment_form_container";

export default class CommentsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchComments();
  }
  
  render() {
    let { comments } = this.props;
    if (!comments[0]) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    let commentLis = comments.map(comment => {
      return (
        <CommentShowContainer comment={ comment } />
      )
    });

    return (
      <>
        <CreateCommentFormContainer />
        <ul>
          { commentLis }
        </ul>
      </>
      
    )
  }
}