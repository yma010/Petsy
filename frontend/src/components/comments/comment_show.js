import React from "react";
import EditCommentFormContainer from "./edit_comment_form_container";

export default class CommentShow extends React.Component {
  render() {
    let { comment, currentUser, editId, changeEdit, deleteComment } = this.props;
    if (!comment) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (editId === comment.id) {
      return (
        <div>
          <EditCommentFormContainer comment={ comment } changeEdit={ changeEdit } />
          <button onClick={ () => changeEdit(undefined) } >Cancel</button>
        </div>
      )
    }

    let authorItems;

    if (currentUser === comment.author.id) {
      authorItems = <>
        <button onClick={ () => deleteComment(comment.id) } >Remove</button>
        <button onClick={ () => changeEdit(comment.id) } >Edit</button>
      </>
      
    }

    return (
      <li>
        <img className="profile-pic" src={ comment.author.image }/>
        <p>{ comment.author.username }</p>
        <p>{ comment.formatPosted }</p>
        {comment.body}
        { authorItems }
      </li>
            
    );
  }
}