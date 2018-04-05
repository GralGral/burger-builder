import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import Logo from '../../Logo/Logo';

import styles from './Toolbar.css';

const toolbar = (props) => (
  <header className={styles.toolbar}>
    <DrawerToggle clicked={props.toggleDrawer}/>
    <div className={styles.logo}>
      <Logo />
    </div>
    <nav className={styles.desktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
