import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import Axios from '../../axios-orders'

import styles from './CheckoutForm.css';

const Fragment = React.Fragment;

class CheckoutForm extends Component {
  state =  {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: {
        name: 'Adrien Graulet',
        address: {
          street: 'test',
          zipCode: '44800',
          country: 'France'
        },
        email: 'test@test.com',
        deliveryMethod: 'fast'
      }
    };
    Axios.post('/orders.json', order).then(
      () => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      }
    ).catch(
      () => {
        this.setState({
          loading: false
        });
      }
    );
    console.log(this.props.ingredients);
  };

  render() {
    let form = this.state.loading ?
      <Spinner/> :
      (
        <Fragment>
          <h4>Please fill the checkout form</h4>
          <form>
            <input className={styles.input} type="text" name="name" placeholder="Your name"/>
            <input className={styles.input} type="email" name="email" placeholder="Your email"/>
            <input className={styles.input} type="text" name="street" placeholder="Your street"/>
            <input className={styles.input} type="text" name="postalCode" placeholder="Your postal code"/>
            <Button btnType="success" clicked={this.orderHandler}>ORDER</Button>
          </form>
        </Fragment>
      );

    return (
      <div className={styles.checkoutForm}>
        {form}
      </div>
    )
  }
}

export default withRouter(CheckoutForm);
