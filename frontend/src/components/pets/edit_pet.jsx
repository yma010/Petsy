import React from "react";

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
      if (response.pet.status === 200) {
        window.location.reload();
        this.props.history.push(`/pets/${response.pet.data._id}`);
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
          <input type="checkbox"
            id="adoptCheckbox"
            value={this.props.adoptable}
            onChange={this.handleAdoptable}
            checked={ (this.state.adoptable) ? "checked" : "" }
            />

          <h3>Price</h3>
          <input type="number" value={this.state.price.$numberDecimal} onChange={this.update('price')} />

          <input type="submit" value="Edit pet listing" />

        </form>

      </div>
    )
  }
}