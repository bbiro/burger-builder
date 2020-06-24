import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  //we don't need the constructor and the state, while we are using redux
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ingredients: {
  //       salad: 1,
  //       meat: 1,
  //       cheese: 1,
  //       bacon: 0,
  //     },
  //     price: 0,
  //   };
  // }

  componentDidMount() {
    //we can clear up this method, once we use redux
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //   if (param[1] === 'price') {
    //     price = param[1];
    //   } else {
    //     ingredients[param[0]] = +param[1];
    //   }
    // }
    // // console.log(ingredients);
    // this.setState({
    //   ingredients: ingredients,
    //   price: price,
    // });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    // console.log(this.state.ingredients);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    tPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
