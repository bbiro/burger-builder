import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  console.log(props);
  switch (props.elementType) {
    case 'input':
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case 'select':
      console.log('[input.js]' + props.elementConfig);
      let options = props.elementConfig.options.map((o) => {
        return (
          <option value={o.value} key={o.value}>
            {o.displayValue}
          </option>
        );
      });
      inputElement = (
        <select className={classes.Select} value={props.value} onChange={props.changed}>
          {/* {props.elementConfig.options.map((o) => (
            <option value={o.value}>{o.displayValue}</option>
          ))} */}
          {options}
        </select>
      ); //<select className={classes.SelectElement}>{options}</select>;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
