import { connect } from 'react-redux';
import { createPet } from "../../actions/pets_actions";
import CreatePet from "./create_pet";
import {withRouter} from 'react-router-dom'
const mapStateToProps = (state) => {
  
  return {
    currentUser: state.session.user,
    loggedIn: state.session.isAuthenticated,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPet: (pet) => dispatch(createPet(pet))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePet));