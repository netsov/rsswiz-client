import React from 'react';

import './style.css';
import '@material/switch/dist/mdc.switch.css';

const Switch = ({ value, label, checked, onToggle, disabled }) => (
  <div className="switch-combo">
    <div className="mdc-switch">
      <input
        className="mdc-switch__native-control"
        id={value}
        type="checkbox"
        checked={!!checked}
        onChange={onToggle(value)}
        disabled={!!disabled}
        aria-label={label}
      />
      <div className="mdc-switch__background">
        <div className="mdc-switch__knob" />
      </div>
    </div>
    &nbsp;
    <label
      htmlFor={value}
      className="mdc-switch-label"
      disabled={disabled}
      checked={checked.toString()}
    >
      {label}
    </label>
  </div>
);

export default Switch;
