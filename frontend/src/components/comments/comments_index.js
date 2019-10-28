import React from "react";
import CommentShowContainer from "./comment_show_container";
import CreateCommentFormContainer from "./create_comment_form_container";
import "./stylesheets/comment.css"
export default class CommentsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: undefined
    };
    this.changeEdit = this.changeEdit.bind(this);
  }

  changeEdit(id) {
    this.setState({
      editId: id
    })
  }

  componentDidMount() {
    this.props.fetchComments();
  }
  
  render() {
    let { comments } = this.props;
    if (!comments[0]) {
      return (
        <div>
          <CreateCommentFormContainer />
        </div>
      )
    }

    let commentLis = comments.map(comment => {
      return (
        <CommentShowContainer
          editId={ this.state.editId }
          changeEdit={ this.changeEdit }
          comment={ comment } 
        />
      )
    });

    return (
      <div>
        <div className="comments-title">
          Comments
        </div>
        <div className="border"></div>
        <ul className="comments-index-container">
          { commentLis }
        </ul>
        <div className="create-form-container">
          < CreateCommentFormContainer />
        </div>
        
      </div>
      
    )
  }
}