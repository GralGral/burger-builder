import React from 'react';

import Button from '../../UI/Button/Button';

const Fragment = React.Fragment;

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((key) => {
      return <li key={key}>
        <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
        </li>
    });

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: ${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancel} btnType='danger'>CANCEL</Button>
      <Button clicked={props.continue} btnType='success'>CONTINUE</Button>
    </Fragment>
  )
};

export default orderSummary;
