import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./stylesheets/pet_show.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
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

    const settings = {
      dots: true,
      infinite: true,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    }

    let optionalItem;

    if (!pet) {
      return <div>Loading...</div>;
    }
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
        <Slider {...settings}>
          <div><img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="" /></div>
          <div><img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="" /></div>
          <div><img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="" /></div>
          <div><img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="" /></div>
          <div><img src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt="" /></div>
        </Slider>
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