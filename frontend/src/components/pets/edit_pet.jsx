import React from "react";

export default class EditPet extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = this.props.pet;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  };

  handleSubmit(e) {
    e.preventDefault();
    const petData = Object.assign({}, this.state);
    let petCreation = this.props.updatePet(petData).then((response) => {
      if (response.pet.status === 200) {
        window.location.reload();
        this.props.history.push(`/pets/${response.pet.data._id}`);
      }
    });
  };

  update(field) {
    return (e) => { this.setState({ [field]: e.target.value }) };
  };

  render() {

    // debugger
    if (document.getElementById('adoptCheckbox') && document.getElementById('adoptCheckbox').checked) {
      console.log("checked")
      this.state.adoptable = Boolean(true);
    } else {
      this.state.adoptable = Boolean(false);
      console.log("unchecked")
    }
    // debugger
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Name</h3>
          <input type="text" value={this.state.name} onChange={this.update('name')} required />

          <h3>Species</h3>
          <input type="text" value={this.state.species} onChange={this.update('species')} required />

          <h3>Color</h3>
          <input type="text" value={this.state.color} onChange={this.update('color')} required />

          <h3>Weight</h3>
          <input type="number" value={this.state.weight.$numberDecimal} onChange={this.update('weight')} required />

          <h3>Sex</h3>
          <input type="text" value={this.state.sex} onChange={this.update('sex')} required />

          <h3>Adoptable</h3>
          <input type="checkbox" value="adopt"
            id="adoptCheckbox"
            defaultChecked="checked"
            value="true"
            onChange={this.update('adoptable')} />

          <h3>Price</h3>
          <input type="number" value={this.state.price.$numberDecimal} onChange={this.update('price')} />

          <input type="submit" value="Edit pet listing" />

        </form>

      </div>
    )
  }
}