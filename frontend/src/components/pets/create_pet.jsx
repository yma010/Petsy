import React from "react";
// import CurrencyInput from 'react-currency-masked-input'

export default class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      species: '',
      color: '', 
      weight: '', 
      adoptable: '',
      price: '',
      owner: '',
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  };

  handleSubmit(e) {
    e.preventDefault();
    
    console.log(this.state.adoptable);
    // this.setState({ owner: this.props.currentUser.id, errors: this.props.errors });
    console.log(this.props.errors);
    const petData = Object.assign({}, this.state);
    this.props.createPet(petData);
  };

  update(field) {
    return(e) => { this.setState({[field]: e.target.value})};
  };

  render() {
    // this.state.owner = this.props.currentUser.username;
    // console.log(this.props)
    // debugger
    console.log(this.state.adoptable);
  //  console.log((this.state.price*1).toFixed(2));


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Name</h3>
          <input type="text" value={this.state.name} onChange={this.update('name')} required/>

          <h3>Species</h3>
          <input type="text" value={this.state.species} onChange={this.update('species')} required/>

          <h3>Color</h3>
          <input type="text" value={this.state.color} onChange={this.update('color')} required/>

          <h3>Weight</h3>
          <input type="text" value={this.state.weight} onChange={this.update('weight')} required/>

          <h3>Sex</h3>
          <input type="text" value={this.state.sex} onChange={this.update('sex')} required/>

          <h3>Adoptable</h3>
          <input type="checkbox" value="adopt"
            id="adoptCheckbox"
            defaultChecked="checked"
            value="true"
            onChange={this.update('adoptable')}/>

          <h3>Price</h3>
          <input type="number" value={this.state.price} onChange={this.update('price')}/>

          <input type="submit" value="Create pet listing"/>

        </form>
        
      </div>
    )
  }
}