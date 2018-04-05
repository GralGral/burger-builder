import React, {Component} from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.css';

const Fragment = React.Fragment;

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => {
    this.setState({
      showSideDrawer: false
    })
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggleDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawer} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  };
}

export default Layout;
