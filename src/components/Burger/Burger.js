import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.css';

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    // ['salad', 'bacon', 'cheese', 'meat']
    .map((key) => {
      return [...new Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} type={key} />;
      })
    })
    // Reduce method use to transform an array of array into one array containing all elements,
    // this in order to have an empty array in case of burger with no ingredient
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={styles.burger}>
      <BurgerIngredient type="bread-top"/>
      {ingredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
