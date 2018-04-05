import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const Fragment = React.Fragment;

const withErrorHandler = (WrappedComponent, Axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInceptor = Axios.interceptors.request.use((req) => {
        this.setState({error: null});
        return req;
      });
      this.respInceptor = Axios.interceptors.response.use(resp => resp, (error) => {
        this.setState({error: error});
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      Axios.interceptors.request.eject(this.reqInterceptor);
      Axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }
};

export default withErrorHandler;
