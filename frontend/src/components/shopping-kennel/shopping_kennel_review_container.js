import { connect } from "react-redux";
import { fetchReceivedRequests, approveRequest, denyRequest } from "../../actions/requests_actions";
import ShoppingKennelReview from "./shopping_kennel_review";

const msp = (state) => {
  return {
    receivedRequests: Object.values(state.entities.receivedRequests).map(receivedRequest => {
      const request = Object.assign({}, receivedRequest);
      request.pet = state.entities.pets[request.pet];
      request.owner = state.entities.users[request.owner];
      request.requestingUser = state.entities.users[request.requestingUser];
      return request;
    })
  }
};

const mdp = (dispatch) => {
  return {
    fetchReceivedRequests: () => dispatch(fetchReceivedRequests()),
    approveRequest: requestId => dispatch(approveRequest(requestId)),
    denyRequest: requestId => dispatch(denyRequest(requestId))
  }
}

const ShoppingKennelReviewContainer = connect(msp, mdp)(ShoppingKennelReview);

export default ShoppingKennelReviewContainer