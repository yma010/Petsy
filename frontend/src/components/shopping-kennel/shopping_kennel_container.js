import { connect } from "react-redux";
import { fetchSentRequests, deleteRequest } from "../../actions/requests_actions";
import ShoppingKennel from "./shopping_kennel";


const msp = (state) => {
  return {
    sentRequests: Object.values(state.entities.sentRequests).map(sentRequest => {
      sentRequest.pet = state.entities.pets[sentRequest.pet];
      sentRequest.owner = state.entities.users[sentRequest.owner];
      sentRequest.requestingUser = state.entities.users[sentRequest.requestingUser];
      return sentRequest;
    })
  }
};

const mdp = (dispatch) => {
  return {
    fetchSentRequests: () => dispatch(fetchSentRequests()),
    deleteRequest: requestId => dispatch(deleteRequest(requestId))
  }
};

const ShoppingKennelContainer = connect(msp, mdp)(ShoppingKennel);

export default ShoppingKennelContainer;