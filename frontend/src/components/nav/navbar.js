import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in (NEED TO ADD WHEN WE DECIDE)
  getLinks() {
    if (this.props.loggedIn) {
      {this.props.closeModal()} //quick fix
      return (
        <div className="nav-link-container logged-in">
          <Link className="nav-link" to={'/pet/list'}>List on Petsy</Link>
          <span className="nav-link">My account</span>
          <button className="nav-link sign-in" onClick={this.props.logout}>Logout</button>
          <Link className="nav-link" to={'/cart'}>Cart</Link>
          {/* Cart icon will be changed to a kennel(?) */}
        </div>
      );
    } else {
      return (
        <div className="nav-link-container">
          <Link className="nav-link" to={'/pet/list'}>List on Petsy</Link>
          <span className="nav-link" onClick={this.props.register}>Register</span>
          <button className="nav-link sign-in" onClick={this.props.login}>Sign In</button>
          <Link className="nav-link" to={'/cart'}>Cart</Link> 
          {/* Cart icon will be changed to a kennel(?) */}
        </div>
      );
    }
  }

  searchBar() {
    return (
      // Need to fix the button dropping to the bottom when the window size is too small horizontally
      <form className="nav-search-bar">
        <input type="text" className="nav-search-bar-input" placeholder="Search for pets"/>
        <button className="nav-search-bar-button" value="testbutton"><span role="img" aria-label="temp">🔍</span></button>
      </form>
    )
  }

  categoriesBar() {
    return (
      <div className="categories-bar">
        <Link className="nav-link category" to="/index">
          All Pets
        </Link>
        <Link className="nav-link category" to="/dogs">
          Dogs
        </Link>
        <Link className="nav-link category" to="/cats">
          Cats
        </Link>
        <Link className="nav-link category" to="/pets1">
          Pets1
        </Link>
        <Link className="nav-link category" to="/pets2">
          Pets2
        </Link>
        <Link className="nav-link category" to="/pets3">
          Pets3
        </Link>
        <Link className="nav-link category" to="/pets4">
          Pets4
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav-main">
          <Link to="/" className="nav-logo">Petsy</Link>
          {this.searchBar()}
          
          {this.getLinks()}
        </div>
        <div>
          {/* Need to fix so underline hits the underlying bottom border - done with a dropdown menu? */}
          {this.categoriesBar()} 
        </div>
        
      </div>
    );
  }
}

export default NavBar;