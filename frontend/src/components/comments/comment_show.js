import React from "react";
import EditCommentFormContainer from "./edit_comment_form_container";
import "./stylesheets/comment.css";

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
      <li className="comment-li" key={comment.id}>
        <div className= "comment-details" >
          
          <div className="comment-user-details">

            <div className="comment-user-info">
             
              <img className="profile-pic" src={ comment.author.image } alt={ comment.author.username }/>        
                <strong className="author">{ comment.author.username }&nbsp;</strong> 
                commented on: { comment.formatPosted }
            
              <div className="comment-controls">
                { authorItems }
              </div>
            
            </div>
          
        </div>

          <div className="comment-content">
            {comment.body}
          </div>

        </div>
      </li>
            
    );
  }
}