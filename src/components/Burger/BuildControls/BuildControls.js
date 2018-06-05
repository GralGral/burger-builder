import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => (
  <div className={styles.buildControls}>
    <p>Current price : <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={props.ingredientAdded.bind(null, ctrl.type)}
        removed={props.ingredientRemoved.bind(null, ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        quantity={props.ingredients[ctrl.type]}
      />
    ))}
    <button
      className={styles.orderButton}
      disabled={!props.purchasable}
      onClick={props.clicked}>
      ORDER NOW
    </button>
  </div>
);


export default buildControls;
