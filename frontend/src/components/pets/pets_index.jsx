import React from "react";
import PetsIndexItem from "./pets_index_item";
import './stylesheets/pets_index.css';

export default class PetsIndex extends React.Component {
  componentDidMount(){
    this.props.fetchPets()
  }

  render() {
    let petsIndexItem;

    petsIndexItem = this.props.pets.map(pets => (<PetsIndexItem key={pets._id} pets={pets} />));

    return (
        <ul className="pets-index-item-ul">
          {petsIndexItem}
        </ul>
    )
  }
}