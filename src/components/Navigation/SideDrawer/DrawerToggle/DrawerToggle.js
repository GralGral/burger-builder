import React from 'react';

import styles from './DrawerToggle.css';

const toggleDrawer = (props) => (
  <div className={styles.drawerToggle} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default toggleDrawer
