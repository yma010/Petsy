import React from 'react';
import Modal from './modal/modal'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import HomePage from './home/home_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import PetsIndexContainer from './pets/pets_index_container';
import CreatePetContainer from './pets/create_pet_container'

const App = () => (
  <div>
    <Modal/>
    <NavBarContainer />
    <div className="nav-bar-bottom" />
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/index" component={PetsIndexContainer} />
      <Route path="/pets/register" component={CreatePetContainer} />
    </Switch>
  </div>
);

export default App;