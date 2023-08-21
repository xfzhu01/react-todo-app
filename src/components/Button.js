import React from 'react';
import style from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

const buttonStyle = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ children, type, variant, ...props }) {
  return (
    <button
      className={getClasses([
        style.button,
        style[`button--${buttonStyle[variant]}`],
      ])}
      type={type === 'submit' ? 'submit' : 'button'}
      {...props}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...props }) {
  return (
    <select
      className={getClasses([style.button, style.button__select])}
      {...props}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
