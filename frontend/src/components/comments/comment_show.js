import React from "react";

export default class CommentShow extends React.Component {
  render() {
    let { comment } = this.props;
    if (!comment) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <li>{comment.body}</li>
    );
  }
}