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
      if (userAuth) {
        // retrieve the userRef of the authorized user
        const userRef = await createUserProfileDocument(userAuth);

        // use the method onSnapshot to retrieve the data
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        // if the user is not logged with update the current user
        // with null
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
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
