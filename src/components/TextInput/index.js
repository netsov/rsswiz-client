import React from 'react';

import './style.css';
import '@material/textfield/dist/mdc.textfield.css';

export default class TextInput extends React.Component {
  handleSubmit = e => {
    if (e.key === 'Enter' && this.input.value) {
      this.props.onEnter(this.input.value);
      this.input.value = '';
    }
  };
  render() {
    const { placeholder } = this.props;
    return (
      <div className="mdc-textfield mdc-textfield--fullwidth">
        <input
          defaultValue={this.props.value}
          type="text"
          className="mdc-textfield__input"
          placeholder={placeholder}
          ref={input => (this.input = input)}
          onKeyPress={this.handleSubmit}
          aria-label={placeholder}
        />
      </div>
    );
  }
}
