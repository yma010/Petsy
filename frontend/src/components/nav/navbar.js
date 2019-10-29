import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './navbar.css';
import debounce from "lodash.debounce";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ""
    }
    this.searchBar = this.searchBar.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    return <Redirect to="/"/>

  }

  // Selectively render links dependent on whether the user is logged in (NEED TO ADD WHEN WE DECIDE)
  getLinks() {
    if (this.props.loggedIn) {
      this.props.closeModal()
       //quick fix
      return (
        <div className="nav-link-container logged-in">
          <Link className="nav-link" to={'/pets/register'}>List on Petsy</Link>
          <Link className="nav-link" to={"/requests"}>Requests</Link>
          <button className="nav-link sign-in" onClick={this.props.logout}>Logout</button>
          <Link className="nav-link" to={'/cart'}>
            cart
          </Link>
          {/* Cart icon will be changed to a kennel(?) */}
        </div>
      );
    } else {
      return (
        <div className="nav-link-container">
          <Link className="nav-link" to={'/pets/register'}>List on Petsy</Link>
          <span className="nav-link" onClick={this.props.register}>Register</span>
          <button className="nav-link sign-in" onClick={this.props.login}>Sign In</button>
          <Link className="nav-link" to={'/cart'}>Cart</Link> 
          {/* Cart icon will be changed to a kennel(?) */}
        </div>
      );
    }
  }

  search(e) {
    e.preventDefault();
    let { searchParams } = this.state;
    if (searchParams.length !== 0) {
      this.props.history.push(`/index?${searchParams}`);
    }
    
  }

  updateSearch() {
    return (e) => {
      const speciesOptions = [
        "dog",
        "cat",
        "bird",
        "rodent",
        "reptile",
        "other"
      ];
      const colorsOptions = [
        "red",
        "blue",
        "green",
        "yellow",
        "brown",
        "turtoise",
        "tuxedo",
        "calico",
        "golden",
        "black",
        "grey",
        "gray"
      ];
      const sexOptions = [
        "male",
        "female",
        "m",
        "f"
      ];
      let searchWords = e.target.value.split(" ");
      this.setState({
        searchParams: searchWords.map(word => {
          word = word.toLowerCase();
          if (speciesOptions.includes(word)) {
            return `species[]=${word}`;
          } else if (colorsOptions.includes(word.toLowerCase())) {
            return `colors[]=${word}`;
          } else if (sexOptions.includes(word)) {
            return `sexes[]=${word}`;
          } else {
            return `names[]=${word}`;
          }
      }).join("&")
      });
    }
  }

  searchBar() {
    return (
      // Need to fix the button dropping to the bottom when the window size is too small horizontally
      <form onSubmit={ this.search } className="nav-search-bar">
        <input type="text" onChange={ this.updateSearch() } className="nav-search-bar-input" placeholder="Search for pets"/>
        <button className="nav-search-bar-button" value="testbutton"><span role="img" className="nav-search-icon" aria-label="temp">🔍</span></button>
      </form>
    )
  }

  categoriesBar() {
    return (
      <div className="categories-bar">
        <Link className="nav-link category" to="/index">
          All Pets
        </Link>
        <Link className="nav-link category" to="/index?species[]=dog">
          Dogs
        </Link>
        <Link className="nav-link category" to="/index?species[]=cat">
          Cats
        </Link>
        <Link className="nav-link category" to="/index?species[]=bird">
          Birds
        </Link>
        <Link className="nav-link category" to="/index?species[]=rodent">
          Rodents
        </Link>
        <Link className="nav-link category" to="/index?species[]=reptile">
          Reptiles
        </Link>
        <Link className="nav-link category" to="/index?species[]=other">
          Others
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