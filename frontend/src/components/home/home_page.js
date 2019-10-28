import React from 'react';
import PetIndexContainerTest from '../pets/pets_index_container'

class HomePage extends React.Component {

  render() {
    return (
      <div className="page-container">
        <div className="home-container">
          <div className="create-pet-form">
          Home page placeholder!
          <div className="splash-art" > 
            <img src="https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/animal-cat-cute-46024.jpg"  alt="splash-cat-dog"/>
          </div >
              Splash art / containers will around this area
                   
          </div>
          <div className="nav-bar-bottom" />
          <PetIndexContainerTest />
          </div>
      </div>
    );
  }
}

export default HomePage;