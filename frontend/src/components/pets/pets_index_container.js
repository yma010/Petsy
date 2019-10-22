import { connect } from "react-redux";
import { fetchPets } from "../../actions/pets_actions";
import PetsIndex from "./pets_index";

const msp = state => ({
  pets: Object.values(state.entities.pets)
});

const mdp = dispatch => ({
  fetchPets: () => dispatch(fetchPets())
});

export default connect(
  msp, 
  mdp
)(PetsIndex)