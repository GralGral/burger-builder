import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const Fragment = React.Fragment;
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

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
    alert('You continue!');
  };


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          clicked={this.purchaseHandler} />
      </Fragment>
    )
  }
}

export default BurgerBuilder;
