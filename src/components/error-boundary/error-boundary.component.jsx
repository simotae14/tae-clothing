import React, { Component } from 'react';
import Navigation from '../../routes/navigation/navigation.component';
import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
} from './error-boundary.styles';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasErrored : false
    }
  }
  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasErrored: true
    }
  }
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <>
          <Navigation />
          <ErrorImageOverlay>
            <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
            <ErrorImageText>Sorry this page is broken</ErrorImageText>
          </ErrorImageOverlay>
        </>
      );
    }
    // if there is no error
    return this.props.children;
  }
}

export default ErrorBoundary;
