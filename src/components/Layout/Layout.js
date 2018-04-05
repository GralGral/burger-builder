import React from 'react';

import styles from './Layout.css';

const Fragment = React.Fragment;

const layout = (props) => (
  <Fragment>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={styles.content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout;
