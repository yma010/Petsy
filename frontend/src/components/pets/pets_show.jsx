import React from "react";
import "./stylesheets/pet_show.css";
import Carousel from "nuka-carousel";
import EditPetContainer from './edit_pet_container'

class PetShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pet: this.props.pets,
      clicked: false
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
      return <div>Loading...</div>;
    }

    let optionalItem;
    let pet_images = pet.image;

    const carouselImages = pet_images.map((image, index) => 
      (<div key={index + 1}><img src={image} alt="" /></div>)
      );


    if (this.props.loggedIn && this.props.currentUser
      && (this.props.currentUser === this.props.pet.owner)) {
      optionalItem =
        <div>
          <button onClick={this.handleClick}>Edit Pet Listing</button>
          {this.state.clicked ? <EditPetContainer pet={this.props.pet} /> : null}
        </div>;
    } else if (this.props.loggedIn && this.props.currentUser
      && (this.props.currentUser !== this.props.pet.owner)) {
      if (!this.props.requestedPets.includes(pet.id)) {
        optionalItem = <button onClick={this.props.requestPet}>Request Pet</button>
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
          <div className="pet-show-name">
            {pet.name}
          </div>
          <div className="pet-show-price">
            ${pet.price}
          </div>
          <div className="a-lie">
            Free shipping to United States
          </div>
          <div className="pet-show-color">
            Color: {pet.color.toUpperCase()}
          </div>
          <div className="pet-show-weight">
            Weight: {pet.weight} lbs
          </div>
          {optionalItem}
        </div>
      </div>
      
    )
    
  }
}


export default PetShow;