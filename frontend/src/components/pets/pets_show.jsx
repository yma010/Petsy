import React from "react";
import "./stylesheets/pet_show.css";
import Carousel from "nuka-carousel";
import EditPetContainer from './edit_pet_container'
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class PetShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pet: this.props.pets,
      clicked: false,
      loading: true
    }

    this.debugEdit = this.debugEdit.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPet(this.props.petId);
    this.props.fetchSentRequests();
    this.setState({
      clicked: false
    });
  }

  debugEdit() {

    return (
      <div><EditPetContainer pet={this.props.pet} /></div>
    )

  }

  handleClick() {
    if (this.state.clicked) {
      this.setState({
        clicked: false
      })
    } else {
      this.setState({
        clicked: true
      })
    }
  }



  render() {
    const { pet } = this.props;

    if (!pet) {
    return (
      <div className='sweet-loading'>
        <PulseLoader
            css={override}
            sizeUnit={"px"}
            size={15}
            color={'#f1631f'}
            loading={this.state.loading}/>
      </div>
    )};

    let optionalItem;
    let pet_images = pet.image;

    const carouselImages = pet_images.map((image, index) => 
      (<div key={index + 1}><img src={image} alt="" /></div>)
      );


    if (this.props.loggedIn && this.props.currentUser
      && (this.props.currentUser === this.props.pet.owner)) {
      optionalItem =
        <div>
          <button className="pet-show-submit" onClick={this.handleClick}>Edit Pet Listing</button>
          {this.state.clicked ? <EditPetContainer pet={this.props.pet} /> : null}
        </div>;
    } else if (this.props.loggedIn && this.props.currentUser
      && (this.props.currentUser !== this.props.pet.owner)) {
      if (!this.props.requestedPets.includes(pet.id)) {
        optionalItem = <button className="pet-show-submit" onClick={this.props.requestPet}>Request Pet</button>
      } else {
        optionalItem = <p>{pet.name} has been added to your shopping kennel, please wait for approval.</p>
      }
    }

    return (
      <div className="pet-show-container">

        <div>
          <Carousel width={"500px"} heightMode={"first"} wrapAround={true} dragging={true}>
          {carouselImages}
          </Carousel>
        </div>


        <div className="pet-show-details">
          <div className="pet-show-detail-box">

            {pet.owner}
            <div className="pet-show-name">
              {pet.name}
            </div>
            <div className="pet-show-price">
              ${pet.price}
            </div>
            <div className="a-lie">
              Free shipping to <u>United States</u>
            </div>

            
            
            {optionalItem}

            <div className="pet-show-spacer"/>

            <span className="pet-show-details-header">
              Pet Details
            </span>

            <div className="pet-show-details-title">Species</div>
            <div className="pet-show-color">
              {pet.species}
            </div>
            

           <div className="pet-show-details-title">Color</div>
            <div className="pet-show-color">
              {pet.color.toLowerCase()}
            </div>

            <div className="pet-show-details-title">Weight</div>
            <div className="pet-show-weight">
              {pet.weight} lbs
            </div>

            
          </div>
        </div>
      </div>
      
    )
    
  }
}


export default PetShow;