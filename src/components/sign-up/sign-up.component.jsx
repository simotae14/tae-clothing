import React, { Component } from 'react';

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {
      displayName,
      email,
      password,
      confirmPassword
    } =  this.state;

    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      // retrieve the authenticated user
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // and save the user in DB
      await createUserProfileDocument(user, { displayName });

      // and now save in the state
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword
    } =  this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>
          I do not have an account
        </h2>
        <span>
          Sign up with your email and password
        </span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;