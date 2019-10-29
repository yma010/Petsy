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
          {pets.name}
        </div>

        <div className="pets-index-item-price">
          ${pets.price}
        </div>



        <div className="pets-index-free-shipping">
          <span className="pets-index-free-shipping-text">FREE shipping</span>
        </div>

        
          {pets.adoptable === true ? 
           <div className="pets-index-item-adoptable">
             <span className="pets-index-free-shipping-text">🏷️Adoptable</span>
          </div> : <div className="pets-index-free-blank"></div>}
          

      </div>

    </Link>

  </li>
);

export default PetsIndexItem;