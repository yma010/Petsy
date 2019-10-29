import React from 'react';
import PetIndexContainerTest from '../pets/pets_index_container'
import './stylesheets/home.css';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

  render() {
    return (
      <div className="page-container">
        <div className="home-container">

          <h1 className="home-splash-header">If it's a dog, cat, or other, it might be on Petsy.</h1>
          <div className="home-splash-container">
           

            <Link to="/index" className="home-left-box">
              <div className="home-left-box-info">
                <div className="home-left-box-info-text">
                  <h1 className="info-text-top">Need a pet for the upcoming season?</h1>
                  <p className="info-text-bottom">Adopt a pet now ></p> 
                </div>
                    
              </div>
              <div className="home-left-box-picture">
                <div className="home-splash-picture"/>
              </div>
              
            </Link>


    

          
                


          </div>
          <div className="home-container-bottom" >
            <div className="home-container-bottom box">
              <h1 className="bottom-box-header"><span className="check">✓</span> Unique everything</h1>
              <p className="bottom-box-text">We have tens of one-of-a-kind pets, so you can find whatever you need (or really, really want).</p>
            </div>

            <div className="home-container-bottom box">
              <h1 className="bottom-box-header"><span className="check">✓</span> Independent listers</h1>
              <p className="bottom-box-text">Adopt directly from someone who put their heart and soul into raising something special.</p>
            </div>

            <div className="home-container-bottom box">
              <h1 className="bottom-box-header"><span className="check">✓</span> Secure adopting</h1>
              <p className="bottom-box-text">Listers can approve or deny potential adoptees for peace of mind.</p>
            </div>
          </div >
          
          <div className="nav-bar-bottom" />
          <PetIndexContainerTest />
          </div>
      </div>
    );
  }
}

export default HomePage;