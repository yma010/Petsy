import React from "react";

export default class CommentShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({
      edit: this.state.edit ? false : true
    })
  }

  render() {
    let { comment, currentUser } = this.props;
    if (!comment) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (this.state.edit) {
      return (
        <div>
          editing...
          <button onClick={ this.toggleEdit } >Cancel</button>
        </div>
      )
    }

    let authorItems;

    if (currentUser === comment.author.id) {
      authorItems = <>
        <button onClick={ () => this.props.deleteComment(comment.id) } >Remove</button>
        <button onClick={ this.toggleEdit } >Edit</button>
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