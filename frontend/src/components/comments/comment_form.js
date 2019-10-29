import React from "react";
import "./stylesheets/comment-form.css";
export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.comment;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
    this.setState(this.props.comment);
  }


  render() {
    return (
      <form className="create-comment-form-body" onSubmit={ this.handleSubmit }>
        <textarea className="create-text" type="text" onChange={ this.update("body") } value={ this.state.body }/>
        <input className="onSubmit" type="submit" value="Add Comment" />
      </form>
    )
  }
}