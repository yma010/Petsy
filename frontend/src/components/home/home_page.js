import React from 'react';
import PetIndexContainerTest from '../pets/pets_index_container'

class HomePage extends React.Component {

  render() {
    return (
      <div className="page-container">
        <div className="home-container">
          <div className="create-pet-form">
          Home page placeholder!
  
            Splash art / containers will around this area
         

          {/* temp home page filler elow */}
          
          </div>
          <div className="nav-bar-bottom" />
          <PetIndexContainerTest />
          </div>
      </div>
    );
  }
}

export default HomePage;