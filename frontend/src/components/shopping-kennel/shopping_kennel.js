import React from "react";

export default class ShoppingKennel extends React.Component {
  componentDidMount() {
    this.props.fetchSentRequests();
  }
  
  render() {
    let { sentRequests, loggedIn } = this.props;
    console.log(this.props);
    if (!loggedIn) {
      return (
        <div className="create-pet-form">
          You must be logged in to view the kennel
        </div>
      )
    };

    if (!sentRequests) return (
      <div>
        Loading...
      </div>
    );

    let sentRequestUls = sentRequests.map(sentRequest => {
      let { pet, owner } = sentRequest;
      let statusInteraction;

      if (sentRequest.status === "pending") {
        statusInteraction = <button onClick={ () => this.props.deleteRequest(sentRequest.id) } >
            Cancel Request
          </button>
      } else {
        statusInteraction = <p>Your request has been { sentRequest.status }</p>
      }
      return (
        <div className="request-listing">
          <ul className="pet-show.details">
            <li>
              <img href="" />
            </li>
            <li className="pet-show-name">
              { pet.name }
            </li>
            <li className="pet-show-price">
              ${ pet.price }
            </li>
            <li className="a-lie">
              Free shipping to United States
            </li>
            <li className="pet-show-color">
              { pet.color }
            </li>
            <li className="pet-show-weight">
              { pet.weight } lbs
            </li>
          </ul>
          <ul className="request-owner-listing">
            <li>Owned by: { owner.username }</li>
          </ul>
          { statusInteraction }
        </div>
      )
    })
    return (
      <div>
        { sentRequestUls }
      </div>
    );
  }
}