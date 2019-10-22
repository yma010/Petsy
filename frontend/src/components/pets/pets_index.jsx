import React from "react";
import PetsIndexItem from "./pets_index_item";

export default class PetsIndex extends React.Component {
  componentDidMount(){
    this.props.fetchPets()
  }

  render() {
    let petsIndexItem;

    petsIndexItem = this.props.pets.map(pets => (<PetsIndexItem key={pets.id} pets={pets} />));

    return (
      <div>
        testing
      </div>
    )
  }
}