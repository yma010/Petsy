import React from 'react';
import { Link } from 'react-router-dom';

const PetsIndexItem = ({ pets }) => (

  <li className="pets-index-item">

    <Link className="pets-index-item-link" to={`/api/pets/${pets.id}`}>

      <div className="pets-index-item-details">

        <div className="pets-index-item-photo">
          Picture Placeholder
        </div>

        <div className="pets-index-item-name">
          {pets.name}
        </div>

        <div className="pets-index-item-owner">
          {pets.owner}
        </div>

        <div className="pets-index-item-price">
          {pets.price}
        </div>

      </div>

    </Link>

  </li>
);

export default PetsIndexItem;