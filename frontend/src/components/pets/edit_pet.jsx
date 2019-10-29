import React from "react";
import "./stylesheets/edit_pet.css";

export default class EditPet extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = this.props.pet;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdoptable = this.handleAdoptable.bind(this);
    this.clearedErrors = false;
  };

  handleSubmit(e) {
    e.preventDefault();
    const petData = Object.assign({}, this.state);
    this.props.updatePet(petData).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };

  update(field) {
    return (e) => { this.setState({ [field]: e.target.value }) };
  };

  handleAdoptable(){
    if (document.getElementById('adoptCheckbox') && document.getElementById('adoptCheckbox').checked) {
      this.setState({ adoptable: Boolean(true) });
    } else {
      this.setState({ adoptable: Boolean(false) });
    }
  }

  render() {

    return (
      <div>
        <form className="edit-pet-form" onSubmit={this.handleSubmit}>
          <h3 className="edit-pet-title">Name</h3>
          <input type="text" className="edit-pet-input-field" placeholder={this.state.name} value={this.state.name} onChange={this.update('name')} required />

          <h3 className="edit-pet-title">Species</h3>
          <select className="edit-pet-input-field" value={this.state.species} onChange={this.update('species')} required>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rodent">Rodent</option>
            <option value="Reptile">Reptile</option>
            <option value="Other">Other</option>
            
          </select>

          <h3 className="edit-pet-title">Color</h3>
          <input type="text" className="edit-pet-input-field" placeholder={this.state.color} value={this.state.color} onChange={this.update('color')} required />

          <h3 className="edit-pet-title">Weight</h3>
          <input type="number" className="edit-pet-input-field" placeholder={this.state.weight} value={this.state.weight} onChange={this.update('weight')} required />



          <h3 className="edit-pet-title">Sex</h3>
          <input type="text" className="edit-pet-input-field" placeholder={this.state.sex} value={this.state.sex} onChange={this.update('sex')} required />

          <h3 className="edit-pet-title">Adoptable</h3>
          <input type="checkbox"
            id="adoptCheckbox"
            value={this.props.adoptable}
            onChange={this.handleAdoptable}
            checked={ (this.state.adoptable) ? "checked" : "" }
            />

          <h3 className="edit-pet-title">Price</h3>
          <input type="number" className="edit-pet-input-field" placeholder={this.state.price} value={this.state.price} onChange={this.update('price')} />

          <input type="submit" className="edit-pet-submit" value="Confirm Changes" />

        </form>

      </div>
    )
  }
}