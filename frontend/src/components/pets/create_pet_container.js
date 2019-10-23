import { connect } from 'react-redux';
import { createPet } from "../../actions/pets_actions";
import CreatePet from "./create_pet";

const mapStateToProps = (state) => {
  // let petInfo = { name: '', species: '', color: '', weight: '', adoptable: Boolean(true), price: '', owner: ''};
  
  return {
    currentUser: state.session.user,
    // petInfo: petInfo, 
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPet: (pet) => dispatch(createPet(pet))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePet);