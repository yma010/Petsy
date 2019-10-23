import { connect } from "react-redux";
import { fetchPet } from "../../actions/pets_actions";
import PetsShow from "./pets_show";

const msp = (state, ownProps)=> ({
  petId: Object.values(ownProps.match.params.petId),
  pet: Object.values(state.entities.petId)
});

const mdp = dispatch => ({
  fetchPet: id => dispatch(fetchPet(id))
});

export default connect(
  msp, 
  mdp
)(PetsShow)