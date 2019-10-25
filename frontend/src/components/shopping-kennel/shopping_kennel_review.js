import React from "react";

export default class ShoppingKennelReview extends React.Component {
  componentDidMount() {
    this.props.fetchReceivedRequests();
  }

  render() {
    let { receivedRequests,
      approveRequest,
      denyRequest
    } = this.props;
    if (!receivedRequests) return (
      <div>
        Loading...
      </div>
    );

    if (receivedRequests.length === 0) {
      return (
        <div className="create-pet-form">
          You have no requests to review
        </div>
      )
    }
    let receivedRequestUls = receivedRequests.map(receivedRequest => {
      let { pet, requestingUser } = receivedRequest;

      
      return (
        <div className="request-listing">
          <ul className="pet-show-details">
            <li>
              <img href="" />
            </li>
            <li className="pet-show-name">
              {pet.name}
            </li>
            <li className="pet-show-price">
              ${pet.price}
            </li>
            <li className="a-lie">
              Free shipping to United States
            </li>
            <li className="pet-show-color">
              {pet.color}
            </li>
            <li className="pet-show-weight">
              {pet.weight} lbs
            </li>
          </ul>
          <ul className="user-show-details">
            <li className="user-show-username">
              { requestingUser.username }
            </li>
          </ul>
          <button onClick={ () => approveRequest(receivedRequest.id) }>Approve</button>
          <button onClick={() => denyRequest(receivedRequest.id)}>Deny</button>
        </div>
      )
    })
    return (
      <div>
        {receivedRequestUls}
      </div>
    );
  }
}