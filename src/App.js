import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  // function to unsuscribe the user
  unsuscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // get the function to call to unsuscribe
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // retrieve the userRef of the authorized user
        const userRef = await createUserProfileDocument(userAuth);

        // use the method onSnapshot to retrieve the data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()            
          });
        });
      } else {
        // if the user is not logged with update the current user
        // with null
        setCurrentUser(userAuth);
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
            exact
            path='/checkout'
            component={CheckoutPage}
          />
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
