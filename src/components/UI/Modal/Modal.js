import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.css';

const Fragment = React.Fragment;

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const classes = this.props.show ? [styles.modal, styles.visible].join(' ') : styles.modal;

    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={classes}>
          {this.props.children}
        </div>
      </Fragment>
    )
  };
}

export default Modal;
