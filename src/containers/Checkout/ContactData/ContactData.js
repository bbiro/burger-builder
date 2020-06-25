import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/order';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: this.getInputStateFormat('input', 'text', 'Your name', '', { required: true }),
        street: this.getInputStateFormat('input', 'text', 'Your street', '', { required: true }),
        zipCode: this.getInputStateFormat('input', 'text', 'Your ZipCode', '', { required: true, minLength: 2, maxLength: 5 }),
        country: this.getInputStateFormat('input', 'text', 'Your Country', '', { required: true }),
        email: this.getInputStateFormat('input', 'email', 'Your email', '', { required: true, email: true }),
        deliveryMethod: {
          elementtype: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' },
            ],
          },
          value: 'fastest',
          validation: null,
          valid: true,
        },
      },
      formIsValid: true,
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

  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({
    //   loading: true,
    // });
    // alert('You continue');
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    // using redux
    const order = {
      ingredients: this.props.ings,
      price: this.props.tPrice,
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);

    // axios
    //   .post('/orders.json', order)
    //   .then((response) => {
    //     // console.log(response);
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     this.setState({ loading: false });
    //   });
  };

  inputChangedHandler = (event, id) => {
    //make a copy (not deep copy)
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[id],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedFormElement.touched = true;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    updatedOrderForm[id] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
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

    if (rules.email) {
      let ruleEmail = /\S+@\S+\.\S+/;
      isValid = ruleEmail.test(value) && isValid;
    }

    return isValid;
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    // console.log(formElementsArray);
    const formElements = formElementsArray.map((e) => {
      return (
        <Input
          name={e.id}
          key={e.id}
          elementType={e.config.elementtype}
          elementConfig={e.config.elementConfig}
          value={e.config.value}
          changed={(event) => this.inputChangedHandler(event, e.id)}
          invalid={e.config.touched && !e.config.valid}
        />
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        {/* <Input elementType='...' elementConfig='...' value='' />
        <Input inputtype='input' type='text' name='email' placeholder='Your mail' />
        <Input inputtype='input' type='text' name='street' placeholder='Street' />
        <Input inputtype='input' type='text' name='postal' placeholder='Postal Code' /> */}
        <Button btnType='Success' disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
