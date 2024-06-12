import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
    /* console.log(errorInfo,error) */
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          {/* <h2>Something went wrong.</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>Component Stack Error Details:</p>
          <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre> */}
          <div className='d-flex flex-column align-items-center justify-content-center text-secondary mt-5 p-5 text-center' style={{fontWeight:600}}>
          <h3 className='mt-5'>Oops !!</h3>
          <h4 className='fw-bold'>Something went wrong.</h4>           
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
