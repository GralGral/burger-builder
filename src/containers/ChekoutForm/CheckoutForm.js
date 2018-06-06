import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import Axios from '../../axios-orders'

import styles from './CheckoutForm.css';

const Fragment = React.Fragment;

class CheckoutForm extends Component {
  state =  {
    orderForm: {
      name: {
        elementType: 'text',
        elementConfig: {
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        dirty: false
      },
      street: {
        elementType: 'text',
        elementConfig: {
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        dirty: false
      },
      zipCode: {
        elementType: 'text',
        elementConfig: {
          placeholder: 'Your postal code'
        },
        value: '',
        validation: {
          required: true,
          length: {
            min: 5,
            max: 5
          }
        },
        valid: false,
        dirty: false
      },
      country: {
        elementType: 'text',
        elementConfig: {
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        dirty: false
      },
      email: {
        elementType: 'email',
        elementConfig: {
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        dirty: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fast', displayValue: 'Fast'},
            {value: 'cheap', displayValue: 'Cheap'}
          ]
        },
        value: 'fast',
        validation: {},
        valid: true,
        dirty: false
      }
    },
    isValid: false,
    isDirty: false,
    loading: false
  };

  /**
   * Handle form submission event
   *
   * @param event       Event object
   */
  orderHandler = (event) => {
    // Prevent form submission
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (let name in this.state.orderForm) {
      formData[name] = this.state.orderForm[name].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      orderData: formData
    };

    // Send post request to Firebase to store the order data
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
  };

  /**
   * Check the validity of the value after each change in an input
   * through validation rules defined in state
   *
   * @param value         Input value
   * @param inputName     Key of the input in this.state.orderForm
   * @returns {boolean}
   */
  isInputValid = (value, inputName) => {
    const rules = this.state.orderForm[inputName].validation;
    let isValid = true;

    if (!rules) {
      return isValid;
    }

    if (rules.required) {
      isValid = isValid && value.trim().length > 0
    }

    if (rules.length) {
      if (rules.length.min) {
        isValid = isValid && value.length >= rules.length.min;
      }

      if (rules.length.max) {
        isValid = isValid && value.length <= rules.length.max
      }
    }

    return isValid;
  };

  /**
   * Handle state update on every form input change
   *
   * @param inputName     Key of the input in this.state.orderForm
   * @param event         Event object
   */
  inputChangedHandler = (inputName, event) => {
    const value = event.target.value;

    this.setState((prevState) => {
      const formState = {...prevState.orderForm};
      // Need to clone object on level deeper cause spread operator clone only one level depth, other stay as pointer
      // inputState is now a mutable clone
      const inputState = {...formState[inputName]};

      // Set new values in state clone
      inputState.value = value;
      inputState.valid = this.isInputValid(value, inputName);
      inputState.dirty = true;
      formState[inputName] = inputState;

      // Check the validity of all inputs in form
      let isFormValid = true;
      for (let key in formState) {
        if (!formState[key].valid) {
          isFormValid = false;
          break;
        }
      }

      return {
        orderForm: {...formState},
        isValid: isFormValid && inputState.valid,
        isDirty: true,
      };
    });
  };

  /**
   * Component render method
   *
   * @returns {*}
   */
  render() {
    // Transform this.state.orderForm object into an array
    let inputs = [];
    for (let key in this.state.orderForm) {
      inputs.push({
        ...this.state.orderForm[key],
        name: key
      });
    }

    // Set form variable to display a spinner or checkout form
    let form = this.state.loading ?
      <Spinner/> :
      (
        <Fragment>
          <h4>Please fill the checkout form</h4>
          <form onSubmit={this.orderHandler}>
            {inputs.map(input =>
              <Input
                type={input.elementType}
                name={input.name}
                config={input.elementConfig}
                value={input.value}
                key={input.name}
                valid={input.valid || !input.dirty}
                changed={this.inputChangedHandler.bind(this, input.name)}
              />
            )}
            <Button btnType="success" disabled={!this.state.isValid || !this.state.isDirty}>ORDER</Button>
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
