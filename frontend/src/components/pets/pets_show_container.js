import { connect } from "react-redux";
import { fetchPet } from "../../actions/pets_actions";
import PetShow from "./pets_show";

const msp = (state, ownProps)=> {
  return ({
    petId: ownProps.match.params.petId,
    pet: state.entities.pets[ownProps.match.params.petId]
  });
};

const mdp = dispatch => ({
  fetchPet: id => dispatch(fetchPet(id))
});

export default connect(
  msp, 
  mdp
)(PetShow)