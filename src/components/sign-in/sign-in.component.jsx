import React, { Component } from 'react';
import './sign-in.styles.scss';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();

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
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput handleChange={this.handleChange} label='Email' name='email' type='email' value={this.state.email} required />
          <FormInput handleChange={this.handleChange} label='Password' name='password' type='password' value={this.state.password} required />
          
          <CustomButton type='submit'>
            Sign in
          </CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn;