import React from 'react';

import styles from './BuildControl.css';

const buildControl = (props) => (
  <div className={styles.buildControl}>
    <div className={styles.label}>{props.label}</div>
    <button className={styles.less} onClick={props.removed} disabled={props.disabled}>-</button>
    <span className={styles.quantity}>{props.quantity}</span>
    <button className={styles.more} onClick={props.added}>+</button>
  </div>
);

export default buildControl;
