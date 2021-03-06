import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: this.getInputStateFormat('input', 'email', 'Email', '', { required: true, isEmail: true }),
        password: this.getInputStateFormat('input', 'password', 'Password', '', { required: true, minLength: 6 }),
      },
      isSignUp: true,
    };
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      console.log('[Auth.js] - componentDidMount - redirect to root');
      this.props.onSetAuthRedirectPath();
    }
  }

  getInputStateFormat = (inputType, configType, placeholder, value, rules) => {
    return {
      elementtype: inputType,
      elementConfig: {
        type: configType,
        placeholder: placeholder,
      },
      value: value,
      validation: rules,
      valid: false,
      touched: false,
    };
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }),
    });

    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementtype}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          invalid={formElement.config.touched && !formElement.config.valid}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    // return !this.props.isAuthenticated ? (
    //   <div className={classes.Auth}>
    //     {authRedirect}
    //     {errorMessage}
    //     <form onSubmit={this.submitHandler}>
    //       {form}
    //       <Button btnType='Success'>Submit </Button>
    //     </form>
    //     <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
    //       Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
    //     </Button>
    //   </div>
    // ) : (
    //   <Redirect to='/' />
    // );

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit </Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
