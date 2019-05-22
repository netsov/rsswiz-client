import React from 'react';

import './style.css';
import Chips from '../Chips';
import TextInput from '../TextInput';

const MultipleINput = ({ placeholder, onAdd, onDelete, values }) => (
  <div className="mi-wrapper">
    <TextInput placeholder={placeholder} onEnter={onAdd} />
    <Chips tags={values} onDelete={onDelete} />
  </div>
);

export default MultipleINput;
