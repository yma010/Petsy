import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.errors})
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user); 
  }

  renderErrors() {
    return(
      <ul className="session-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="modal-login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-container">
              <h1 className="session-header">Sign in to continue</h1>
            {this.renderErrors()}
            <div className="session-div-login" />

            <h3 className="session-input-title">Email address</h3> 
              <input type="text"
                className="session-input-field"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
                autoFocus
              />
            <br/>
              <h3 className="session-input-title">Password</h3> 
              <input type="password"
                className="session-input-field"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <input className="session-form-submit" type="submit" value="Sign in" />
            <div className="session-or-line">
              <span className="session-or">OR</span>
            </div>
            <button className="session-demo-login" onClick={this.props.guestLogin} ><span role="img" aria-label="temp">🐶</span> Continue with Demo</button>
            <p className="session-demo-text">
              Some of the features of Petsy require that you be logged into a session / current user to operate.
              <br/><br/>
      
              By clicking Continue with Demo, you will be logged into a guest account that has several default seeded values that allow you to test the functionality of the Petsy application. Have fun!
            </p>
            
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);