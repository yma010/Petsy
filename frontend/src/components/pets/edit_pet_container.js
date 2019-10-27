import { connect } from 'react-redux';
import { updatePet } from "../../actions/pets_actions";
import EditPet from "./edit_pet";
import { withRouter } from 'react-router-dom'
const mapStateToProps = (state, ownProps) => {
  // let petInfo = { name: '', species: '', color: '', weight: '', adoptable: Boolean(true), price: '', owner: ''};
  let pet = state.entities.pets[ownProps.match.params.petId]
  return {
    currentUser: state.session.user,
    // petInfo: petInfo, 
    pet: pet,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePet: (pet) => dispatch(updatePet(pet))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPet));