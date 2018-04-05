import React from 'react';

import styles from './Spinner.css';

const spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.doubleBounce1} />
    <div className={styles.doubleBounce2} />
  </div>
);

export default spinner;
