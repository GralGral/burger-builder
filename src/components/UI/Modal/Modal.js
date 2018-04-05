import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.css';

const Fragment = React.Fragment;

const modal = (props) => {
  const classes = props.show ? [styles.modal, styles.visible].join(' ') : styles.modal;

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={classes}>
        {props.children}
      </div>
    </Fragment>
  )
};

export default modal;
