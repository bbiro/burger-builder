import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    };
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  componentDidMount() {
    // axios
    //   .get('/orders.json')
    //   .then((res) => {
    //     // console.log(res.data);
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({
    //       loading: false,
    //       orders: fetchedOrders,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });
    //this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (this.props.orders.length > 0) {
      orders = this.props.orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />);
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
