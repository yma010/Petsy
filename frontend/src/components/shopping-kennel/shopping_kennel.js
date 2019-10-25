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
        <ul className="request-listing">
          <li>NAME: {pet.name}</li>
          <li>SPECIES: {pet.species}</li>
          <li>COLOR: {pet.color}</li>
          <li>SEX: {pet.sex}</li>
        </ul>
      )
    })
    return (
      <div>
        { sentRequestUls }
      </div>
    );
  }
}