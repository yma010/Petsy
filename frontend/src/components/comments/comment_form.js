import React from "react";

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
      <form onSubmit={ this.handleSubmit }>
        <input type="text" onChange={ this.update("body") } value={ this.state.body }/>
        <input type="submit" value="Add Comment" />
      </form>
    )
  }
}