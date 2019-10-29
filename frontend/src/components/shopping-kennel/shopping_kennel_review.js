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
          <div className="pet-show-details" >
            <div>
              <img src={pet.image[0]} alt={ pet.name } />
            </div>
            <p className="pet-show-name" >
              {pet.name}
            </p>
            <p className="pet-show-price" >
              ${pet.price}
            </p>
            <p className="a-lie" >
              Free shipping to United States
            </p>
            <p className="pet-show-color" >
              {pet.color}
            </p>
            <p className="pet-show-weight" >
              {pet.weight} lbs
            </p>
          </div>
          <div className="user-show-details" >
            <img className="profile-pic" src={ requestingUser.image } alt={ requestingUser.username }/>
            <p className="user-show-username">
              { requestingUser.username }
            </p>
          </div>
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