import React from "react";
import EditCommentFormContainer from "./edit_comment_form_container";
import './stylesheets/comments.css';


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
        <div className="comment-item-container">
          <div className="comment-header">
            <img className="comment-profile-picture" src={comment.author.image} />
            <span className="comment-header-text">Reviewed by {comment.author.username} on {comment.formatPosted}</span>

          </div>

          <div className="comment-body-container"> 
            {comment.body}


          </div>

          <div className="comment-buttons">
            {authorItems}
          </div>

        </div>
      </li>
            
    );
  }
}