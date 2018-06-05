import React, {Component} from 'react';

import Order from '../../components/Order/Order'
import Axios from '../../axios-orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    Axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          orders: orders,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }

  render() {

    return (
      <div>
        {this.state.orders.map(order =>
          <Order
            ingredients={order.ingredients}
            totalPrice={+order.price}
            key={order.id}
          />
        )}
      </div>
    )
  }
}

export default withErrorHandler(Orders,Axios);