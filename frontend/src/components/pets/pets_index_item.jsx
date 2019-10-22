import React from 'react';
import { Link } from 'react-router-dom';

const PetsIndexItem = ({ pets }) => (
  <li className="pets-index-item">
    <div className="pets-index-item-details">
    
      <div className="pets-index-item-name">
      {pets.name}
      </div>
    
    </div>
  </li>
)