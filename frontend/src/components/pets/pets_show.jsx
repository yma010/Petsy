import React from "react";
import { Link } from 'react-router-dom';
import EditPetContainer from './edit_pet_container'
class PetShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pet: this.props.pets,
      clicked: false
    }

    this.debugEdit = this.debugEdit.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPet(this.props.petId);
    this.setState({
      clicked: false
    });
  }

  debugEdit() {

    return (
      <div><EditPetContainer pet={this.props.pet} /></div>
    )

  }

  handleClick() {
    if (this.state.clicked) {
      this.setState({
        clicked: false
      })
    } else {
      this.setState({
        clicked: true
      })
    }
  }


  render() {
    const { pet } = this.props;

    if (!pet) {
      return <div>Loading...</div>;
    } else if (this.props.loggedIn && this.props.currentUser 
        && (this.props.currentUser === this.props.pet.owner)) {
      return (
        <div className="pet-show-container">
          
          {/* debug */}
          <ul>
            <li>NAME: {pet.name}</li>
            <li>SPECIES: {pet.species}</li>
            <li>COLOR: {pet.color}</li>
            <li>SEX: {pet.sex}</li>
          
          </ul>
          Current user found, access to edit pet given!
          <button onClick={this.handleClick}>EDIT PET TEST</button>
          {this.state.clicked ? <EditPetContainer pet={this.props.pet} /> : null}
        </div>
      )
    } else {
      return (
        <div className="pet-show-container">

          {/* debug */}
          <ul>
            <li>NAME: {pet.name}</li>
            <li>SPECIES: {pet.species}</li>
            <li>COLOR: {pet.color}</li>
            <li>SEX: {pet.sex}</li>
          </ul>


        </div>
      )
    }
  } 
}

export default PetShow;