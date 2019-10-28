import { connect } from "react-redux";
import { fetchPets, fetchPet } from "../../actions/pets_actions";
import PetsIndex from "./pets_index";

const msp = state => ({
  pets: Object.values(state.entities.pets)
});

const mdp = (dispatch, { location: { search } }) => {
  return {
    fetchPets: () => dispatch(fetchPets(search.slice(1))),
    fetchPet: id => dispatch(fetchPet(id))
}};

export default connect(
  msp, 
  mdp
)(PetsIndex)