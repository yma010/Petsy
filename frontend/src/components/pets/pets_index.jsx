import React from "react";
import PetsIndexItem from "./pets_index_item";
import './stylesheets/pets_index.css';

export default class PetsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPets()
  }

  componentDidUpdate({ location: { search } }) {
    if (this.props.location.search !== search) {
      this.props.fetchPets();
    }
  }

  render() {
    let petsIndexItem;
    let { pets } = this.props;


    if (pets.length === 0) {
      return (
        <div className="create-pet-form">
          No pets were found with your criteria
        </div>
      )
    }

    petsIndexItem = pets.map(pets => (<PetsIndexItem key={pets.id} pets={pets} />));


    return (
      <ul className="pets-index-item-ul">
        {petsIndexItem}
      </ul>
    )
  }
}