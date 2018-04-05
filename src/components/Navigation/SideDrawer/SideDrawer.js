import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.css';

const Fragment = React.Fragment;

const sideDrawer = (props) => {
  let classes = [styles.sideDrawer, styles.close];
  if (props.open) {
    classes = [styles.sideDrawer, styles.open]
  }

  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={classes.join(' ')}>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
