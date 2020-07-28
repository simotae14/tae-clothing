import React, { Component } from 'react';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

import {
  ButtonsContainer,
  SignInTitle,
  SignInContainer
} from './sign-in.styles';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {
      email,
      password
    } = this.state;

    // if we try to sign in with email and password
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // clear the state
      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      console.log(error);
    }

    this.setState({
      email: '',
      password: ''
    });
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput handleChange={this.handleChange} label='Email' name='email' type='email' value={this.state.email} required />
          <FormInput handleChange={this.handleChange} label='Password' name='password' type='password' value={this.state.password} required />
          <ButtonsContainer>
            <CustomButton type='submit'>
              Sign in
            </CustomButton>
            <CustomButton 
              type='button'
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </ButtonsContainer>
          
        </form>
      </SignInContainer>
    )
  }
}

export default SignIn;