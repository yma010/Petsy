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
      <li>
      <img className="profile-pic" src={ comment.author.image }/>
      <p>{ comment.author.username }</p>
      <p>{ comment.posted }</p>
      {comment.body}
      </li>
    );
  }
}