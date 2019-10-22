import { connect } from "react-redux";
import { fetchPets } from "../../actions/pets_actions";
import PetsIndex from "./pets_index";

const msp = state => ({
  pets: state.entities.pets
});

const mdp = dispatch => ({
  fetchPets: () => dispatch(fetchPets())
});

const PetsIndexContainer = connect(msp, mdp)(PetsIndex)