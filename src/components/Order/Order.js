import React from 'react';

import styles from './Order.css';

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientsOutput = ingredients.map(ig =>
    <span key={ig.name}>{ig.name} ({ig.amount})</span>
  );

  return (
    <div className={styles.order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
    </div>
  )
};

export default order;