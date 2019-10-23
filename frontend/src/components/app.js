import React from 'react';
import Modal from './modal/modal'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import HomePage from './home/home_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import PetsIndexContainer from './pets/pets_index_container';

const App = () => (
  <div>
    <Modal/>
    <NavBarContainer />
    <div className="nav-bar-bottom" />
    <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/" component={HomePage}/>
        <Route path="/index" component={PetsIndexContainer} />
    </Switch>
  </div>
);

export default App;