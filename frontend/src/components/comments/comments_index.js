import React from "react";

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
    console.log(comments);
    let commentLis = comments.map(comment => {
      return (
        <li>{comment.body}</li>
      );
    });

    return (
      <ul>
        { commentLis }
      </ul>
    )
  }
}