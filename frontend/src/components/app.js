import React from 'react';
import Modal from './modal/modal'
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import HomePage from './home/home_page';
import PetsIndexContainer from './pets/pets_index_container';
import CreatePetContainer from './pets/create_pet_container'
import PetShowContainer from './pets/pets_show_container';
import EditPetContainer from './pets/edit_pet_container';
import ShoppingKennelContainer from './shopping-kennel/shopping_kennel_container';
import { ProtectedRoute } from "../util/route_util";
import ShoppingKennelReviewContainer from './shopping-kennel/shopping_kennel_review_container';

const App = () => (
  <div>
    <Modal/>
    <NavBarContainer />
    <div className="nav-bar-bottom" />
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/index" component={PetsIndexContainer} />
      <Route path="/pets/register" component={CreatePetContainer} />
      <Route path="/pets/edit/:editPetId" component={EditPetContainer} />
      <Route path="/pets/:petId" component={PetShowContainer} />
      <Route path="/cart" component={ ShoppingKennelContainer } />
      <ProtectedRoute path="/requests" component={ ShoppingKennelReviewContainer } />
    </Switch>
  </div>
);

export default App;