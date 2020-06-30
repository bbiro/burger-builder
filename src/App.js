import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const AsyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={AsyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={AsyncCheckout} />
          <Route path='/auth' component={AsyncAuth} />
          <Route path='/orders' component={AsyncOrders} />
          <Route path='/logout' component={AsyncLogout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
          <Redirect to='/' />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
