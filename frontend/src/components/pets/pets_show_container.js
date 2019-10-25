import { connect } from "react-redux";
import { fetchPet } from "../../actions/pets_actions";
import PetShow from "./pets_show";
import { sendRequest, fetchSentRequests } from "../../actions/requests_actions";

const msp = (state, ownProps)=> {
  return ({
    petId: ownProps.match.params.petId,
    pet: state.entities.pets[ownProps.match.params.petId],
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user ? state.session.user.id : undefined,
    requestedPets: Object.values(state.entities.sentRequests).map(request => request.pet)
  });
};

const mdp = (dispatch, ownProps) => ({
  fetchPet: id => dispatch(fetchPet(id)),
  requestPet: () => dispatch(sendRequest(ownProps.match.params.petId)),
  fetchSentRequests: () => dispatch(fetchSentRequests())
});

export default connect(
  msp, 
  mdp
)(PetShow)