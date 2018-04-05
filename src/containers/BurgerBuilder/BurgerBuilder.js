import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Fragment = React.Fragment;
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    Axios.get('/ingredients.json').then(
      (response) => {
        this.setState({ingredients: response.data});
      }
    ).catch((error) => {});
  }

  updatePurchaseState(ingredients) {
    this.setState((prevState, props) => {
      ingredients = {
        ...prevState.ingredients
      };
      const sum = Object.keys(ingredients)
        .map((key) => {
          return ingredients[key] * INGREDIENT_PRICES[key];
        })
        .reduce((sum, el) => {
          return sum + el
        }, 0);

      return {purchasable: sum > 0}
    })
  }

  addIngredientHandler = (type) => {
    const updatedCounted = this.state.ingredients[type] + 1;
    const updatedTotal = this.state.totalPrice + INGREDIENT_PRICES[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCounted;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotal
    });
    this.updatePurchaseState();
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedCounted = this.state.ingredients[type] - 1;
    const updatedTotal = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCounted;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotal
    });
    this.updatePurchaseState();
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
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
          loading: false,
          purchasing: false
        });
      }
    ).catch(
      () => {
        this.setState({
          loading: false,
          purchasing: false
        });
      }
    );
  };


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummaryModal = this.state.loading || !this.state.ingredients ?
      <Spinner /> :
      <OrderSummary
      ingredients={this.state.ingredients}
      cancel={this.purchaseCancelHandler}
      continue={this.purchaseContinueHandler}
      totalPrice={this.state.totalPrice} />;

    let burger = !this.state.ingredients ?
      <Spinner /> :
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          clicked={this.purchaseHandler}
          ingredients={this.state.ingredients} />
      </Fragment>;

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummaryModal}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, Axios);
