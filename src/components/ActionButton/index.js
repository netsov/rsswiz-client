import React from 'react';
import classNames from 'classnames';

import './style.css';
import '@material/button/dist/mdc.button.css';

const ActionButton = ({
  disabled,
  handleClick,
  children,
  raised,
  accent,
  ...rest
}) => {
  return (
    <button
      className={classNames({
        'mdc-button': true,
        'mdc-button--raised': raised,
        'mdc-button--accent': accent,
      })}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      aria-label={children}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ActionButton;
