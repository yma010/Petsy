import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

import NavBar from './navbar';
import { fetchPets } from '../../actions/pets_actions';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  login: () => dispatch(openModal("login")),
  register: () => dispatch(openModal("register")),
  logout: () => dispatch(logout()),
  fetchPets: (searchParams) => dispatch(fetchPets(searchParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);