import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  // function to unsuscribe the user
  unsuscribeFromAuth = null;

  componentDidMount() {
    // get the function to call to unsuscribe
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      this.setState({
        currentUser: userAuth
      })
      createUserProfileDocument(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route
            exact
            path='/'
            component={HomePage}
          />
          <Route
            path='/shop'
            component={ShopPage}
          />
          <Route
            path='/signin'
            component={SignInAndSignUpPage}
          />
        </Switch>
      </div>
    );
  }

}

export default App;
