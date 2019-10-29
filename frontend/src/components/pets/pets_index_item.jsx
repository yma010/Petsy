import React from 'react';
import { Link } from 'react-router-dom';
import "./stylesheets/pets_index.css";

const PetsIndexItem = ({ pets }) => (
  <li className="pets-index-item">
    <Link className="pets-index-item-link" to={`/pets/${pets.id}`}>

      <div className="pets-index-item-details">

        <div className="pets-index-item-photo">
          <img src={pets.image[0]} alt="Cute Animal!" />
        </div>

        <div className="pets-index-item-name">
          Name: {pets.name}
        </div>

        <div className="pets-index-item-price">
          Price: {pets.price}
        </div>

        <div className="pets-index-item-adoptable">
          Adoptable? : {pets.adoptable === true ? "Yes" : "No"}
        </div>

      </div>

    </Link>

  </li>
);

export default PetsIndexItem;