import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import CheckoutForm from "../ChekoutForm/CheckoutForm";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  };

  componentDidMount() {
      this.setState({
        ...this.props.location.state
      });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/form')
  };

  renderCheckoutForm = () => <CheckoutForm
    ingredients={this.state.ingredients}
    totalPrice={this.state.totalPrice}/>;

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path + '/form'} render={this.renderCheckoutForm}/>
      </div>
    )
  }
}

export default Checkout;
