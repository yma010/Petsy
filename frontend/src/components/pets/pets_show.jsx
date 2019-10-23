import React from "react";
import { Link } from 'react-router-dom';

class PetShow extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      pet: this.props.pets
    }
  }

  componentDidMount(){
    this.props.fetchPet(this.props.listingId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.petId != this.props.match.params.petId) {
      this.props.fetchPet(this.props.petId);
    }
  }

  render(){
    const { pet } = this.props;

    return(
      <div className="pet-show-container">
        {pet.name}
      </div>
    )
  }
}

export default PetShow;