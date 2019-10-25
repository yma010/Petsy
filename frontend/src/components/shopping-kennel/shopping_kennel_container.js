import { connect } from "react-redux";
import { fetchSentRequests, deleteRequest } from "../../actions/requests_actions";
import ShoppingKennel from "./shopping_kennel";


const msp = (state) => {
  return {
    sentRequests: Object.values(state.entities.sentRequests).map(sentRequest => {
      const request = Object.assign({}, sentRequest);
      request.pet = state.entities.pets[request.pet];
      request.owner = state.entities.users[request.owner];
      request.requestingUser = state.entities.users[request.requestingUser];
      return request;
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