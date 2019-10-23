import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
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
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user); 
    
    this.setState({errors: this.props.errors})
    console.log(this.props.errors)
    let userLogin = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(userLogin);
  }

  renderErrors() {
    return(
      <ul className="session-errors">
        {Object.keys(this.state.errors).map((error, i) => {
          return (<li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>);
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="modal-login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-container">

            <h1 className="session-header">Create your account</h1>
            <h3 className="session-header-subtext">Registration is easy.</h3>
            {this.renderErrors()}
            <div className="session-div-signup"/>
            
            <h3 className="session-input-title">Email address <span className="session-input-title-strong">*</span></h3> 
              <input type="text"
                className="session-input-field"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
                autoFocus
              />
            <br/>
            <h3 className="session-input-title">Username <span className="session-input-title-strong">*</span></h3> 
              <input type="text"
                className="session-input-field"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
            <br/>
            <h3 className="session-input-title">Password <span className="session-input-title-strong">*</span></h3> 
              <input type="password"
                className="session-input-field"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <h3 className="session-input-title">Confirm password <span className="session-input-title-strong">*</span></h3> 
              <input type="password"
                className="session-input-field"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            <br/>
            <input className="session-form-submit" type="submit" value="Register" />
            <div className="session-or-line">
              <span className="session-or">OR</span>
            </div>
            <button className="session-demo-login"><span role="img" aria-label="temp">🐶</span> Continue with Demo</button>

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);