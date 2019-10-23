import { connect } from "react-redux";
import { fetchPets, fetchPet } from "../../actions/pets_actions";
import PetsIndex from "./pets_index";

const msp = state => ({
  pets: Object.values(state.entities.pets)
});

const mdp = dispatch => ({
  fetchPets: () => dispatch(fetchPets()),
  fetchPet: id => dispatch(fetchPet(id))
});

export default connect(
  msp, 
  mdp
)(PetsIndex)