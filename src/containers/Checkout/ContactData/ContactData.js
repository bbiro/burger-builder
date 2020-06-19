import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: this.getInputStateFormat('input', 'text', 'Your name', ''),
        street: this.getInputStateFormat('input', 'text', 'Your street', ''),
        zipCode: this.getInputStateFormat('input', 'text', 'Your ZipCode', ''),
        country: this.getInputStateFormat('input', 'text', 'Your Country', ''),
        email: this.getInputStateFormat('input', 'email', 'Your email', ''),
        deliveryMethod: {
          elementtype: 'select',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' },
            ],
          },
        },
      },
      loading: false,
    };
  }

  getInputStateFormat = (inputType, configType, placeholder, value) => {
    console.log({
      elementtype: inputType,
      elementConfig: {
        type: configType,
        placeholder: placeholder,
      },
      value: value,
    });
    return {
      elementtype: inputType,
      elementConfig: {
        type: configType,
        placeholder: placeholder,
      },
      value: value,
    };
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    // alert('You continue');
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post('/orders.json', order)
      .then((response) => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ loading: false });
      });
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
    updatedOrderForm[id] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    console.log(formElementsArray);
    const formElements = formElementsArray.map((e) => {
      return (
        <Input
          name={e.id}
          key={e.id}
          elementType={e.config.elementtype}
          elementConfig={e.config.elementConfig}
          value={e.config.value}
          changed={(event) => this.inputChangedHandler(event, e.id)}
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
        <Button btnType='Success'>Order</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
