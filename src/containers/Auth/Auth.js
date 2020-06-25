import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

import classes from './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: this.getInputStateFormat('input', 'email', 'Email', '', { required: true, isEmail: true }),
        password: this.getInputStateFormat('input', 'password', 'Password', '', { required: true, minLength: 6 }),
      },
    };
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
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      let ruleEmail = /\S+@\S+\.\S+/;
      isValid = ruleEmail.test(value) && isValid;
    }

    return isValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => {
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
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
