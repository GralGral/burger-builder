import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.css';

const logo = (props) => (
  <div className={styles.logo}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default logo;
