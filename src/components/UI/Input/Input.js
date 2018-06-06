import React from 'react'

import styles from './Input.css'

const input = (props) => {
  let inputElement = null;
  let classes = [styles.inputElement];

  if (!props.valid) {
    classes.push(styles.error);
  }

  classes = classes.join(' ');

  switch (props.type) {
    case 'textarea':
      inputElement = <textarea
        className={classes}
        value={props.value}
        {...props.config}
        onChange={props.changed}
      />;
      break;
    case 'select':
      inputElement = <select
        className={classes}
        value={props.value}
        onChange={props.changed}
        >
          {props.config.options.map(option =>
            <option
              value={option.value}
              key={option.value}
            >
              {option.displayValue}
            </option>
          )}
      </select>;
      break;
    default:
      inputElement = <input
        className={classes}
        type={props.type}
        value={props.value}
        {...props.config}
        onChange={props.changed}
      />;
      break;
  }
  
  return (
    <div className={styles.input}>
      {props.label ?
        <label className={styles.label} htmlFor={props.name ? props.name : ''}>{props.label}</label> :
        null}
      {inputElement}
    </div>
  );
};

export default input;
