import React from "react";

export default class ShoppingKennel extends React.Component {
  componentDidMount() {
    this.props.fetchSentRequests();
  }
  
  render() {
    console.log(this.props);
    let { sentRequests } = this.props;
    if (!sentRequests) return (
      <div>
        Loading...
      </div>
    );
    let sentRequestUls = sentRequests.map(sentRequest => {
      let { pet, owner } = sentRequest;
      return (
        <div className="request-listing">
          <ul className="pet-show.details">
            <li>
              <img href={ pet.image } />
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
          <button onClick={ () => this.props.deleteRequest(sentRequest.id) } >
            Cancel Request
          </button>
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