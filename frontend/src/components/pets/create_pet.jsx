import React from "react";
import './stylesheets/create_pet.css';
import axios from 'axios';
// import CurrencyInput from 'react-currency-masked-input'
 
export default class CreatePet extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      name: '',
      species: 'Dog',
      color: '',
      weight: '',
      adoptable: Boolean(true),
      sex: '',
      price: '',
      image: null,
      errors: {}
    }
 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdoptable = this.handleAdoptable.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.clearedErrors = false;
 
  };
 
  componentDidMount() {
    this.setState({adoptable: Boolean(true)})
  }
   
  updateFile(e) {
    let imageFiles = e.target.files;
    this.setState({
      image: imageFiles,
    })
  };
 
  handleSubmit(e) {
    e.preventDefault();
   
    let data = new FormData();
    const images = this.state.image,
          fileName = this.state.name;
 
    ;
    for(let i = 0; i < images.length; i++){
      data.append("image[]", images[i], fileName[i].name);
    }
    console.log(data.getAll("image[]")); //Checks if data is actually populated with the images
 
    const config = {
      headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }
    let debugInfo = Object.assign({}, this.state);
    console.log(debugInfo);
 
    axios.post('api/image/pet-upload', data, config)
      .then((response) => {
        console.log(response)
        this.setState({
          image: response.data.imageUrl
        })
      }).then((response) => {
        console.log(response);
        //Pet creation only occurs if it receives a response from axios
        const petData = Object.assign({}, this.state);
 
        this.props.createPet(petData).then((response) => {
          if (response.pet.status === 200) {
            this.props.history.push(`/pets/${response.pet.data._id}`);
          }
        });
      }
    );
  };
 
 
  update(field) {
    return (e) => { this.setState({ [field]: e.target.value }) };
  };
 
  handleAdoptable() {
    this.setState(({ adoptable }) => (
      {
        adoptable: !this.state.adoptable
      }
    ))
  }
 
  render() {
    if (this.props.loggedIn)
    {
      return (
        <div className="page-container">
          <div className="section-form">
            <div className="create-pet-form">
              Splash container or "subway stop" styled progress bar will go here
 
            </div>
 
            <h1 className="create-header">List on Petsy</h1>
            <h2 className="create-header-sub">Let's get started! Tell us about your pet.</h2>
 
            <form onSubmit={this.handleSubmit} className="create-pet-form">
 
              <div className="form-field-row">
                <h3 className="form-field-title">Pictures</h3>
                <input type="file" name="image" onChange={this.updateFile} multiple accept="image/*" />
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Name</h3>
                <input type="text" className="form-field-input" value={this.state.name} onChange={this.update('name')} required />
                <p className="form-field-description-text">The name of your pet. You don't have to get too creative with the name (although a pet should already have had one by now.) The adopter can always change it later!</p>
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Species</h3>
 
                <select className="form-field-input" value={this.state.species} onChange={this.update('species')} required>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rodent">Rodent</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Other">Other</option>
                </select>
 
                <p className="form-field-description-text">What is the species of your animal? If you don't know it, give a rough estimate based on the looks or pick something at random.</p>
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Color</h3>
                <input type="text" className="form-field-input" value={this.state.color} onChange={this.update('color')} required />
                <p className="form-field-description-text">Self explanatory. If the dog is brown, list it as brown. If you're colorblind, list it as brown.</p>
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Weight</h3>
                <input type="number" className="form-field-input" value={this.state.weight} onChange={this.update('weight')} required />
                <p className="form-field-description-text">As an estimation, how much does your pet weigh in lbs?</p>
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Sex</h3>
                <input type="text" className="form-field-input" value={this.state.sex} onChange={this.update('sex')} required />
                <p className="form-field-description-text">Flip over and check. Or make it a surprise.</p>
              </div>
 
              <div className="form-spacer"></div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Adoptable</h3>
 
              <label className="container">
              <input type="checkbox"
                id="adoptCheckbox"
                checked={ this.state.adoptable }
                onChange={this.handleAdoptable}
                // checked={(this.state.adoptable) ? "checked" : ""}
                     />
                <span className="checkmark"></span>
                </label>
 
 
                <p className="form-field-description-text">Would you like to put this pet up for adoption? If not, you will be creating a listing for people to sponsor the animal.</p>
              </div>
 
              <div className="form-field-row">
                <h3 className="form-field-title">Price</h3>
                <input type="number" className="form-field-input" value={this.state.price} onChange={this.update('price')} required />
                <p className="form-field-description-text">What are the adoption fees or sponsorship price?</p>
              </div>
 
              <div className="form-end-spacer" />
 
              <div className="form-field-nav-submit">
                <p className="form-field-description-text submit-text">By clicking Create pet listing, you are agreeing to either put your pet up for adoption or make available for sponsorships. </p>
                <input className="form-submit" type="submit" value="Create pet listing" />
              </div>
 
 
 
            </form>
          </div>
 
        </div>
      )
    } else {
      return (
        <div className="page-container">
          <div className="create-pet-form">
            You must have an account in order to create a pet listing
          </div>
        </div>
      )
    }
 
 
 
  }
}