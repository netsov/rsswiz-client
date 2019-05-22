import React from 'react';
import classNames from 'classnames';

import './style.css';
import TextInput from '../TextInput';
import Elevation from '../Elevation';

export default class Email extends React.Component {
  state = {
    sent: false,
    // value: null,
    // edit: false,
    invalid: false
  };

  submit = value => {
    if (value) {
      if (!this.validate(value)) return;
      this.props.updateEmail(value);
    }
    this.setState({ edit: false });
  };

  validate = value => {
    let invalid = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      invalid = true;
    }
    this.setState({ invalid });
    return !invalid;
  };

  handleResend = e => {
    e.preventDefault();
    this.props.confirmEmail();
    this.setState({ sent: true });
  };

  render() {
    const { confirmed, email } = this.props;
    const { invalid, sent } = this.state;

    let helper;
    if (invalid) {
      helper = 'This email is invalid';
    } else if (email && confirmed) {
      helper = 'Verified';
    } else if (email && !confirmed && !sent) {
      helper = (
        <small className="resend-container">
          Please check your inbox to confirm your email address.&nbsp;
          <a onClick={this.handleResend} href="">
            Resend
          </a>
        </small>
      );
    }

    return (
      <Elevation>
        <TextInput
          placeholder="Email"
          value={email}
          onEnter={this.submit}
          reset={false}
        />
        {helper && (
          <p
            className={classNames(
              'mdc-textfield-helptext mdc-textfield-helptext--persistent',
              { 'help-text-error': invalid, 'help-text-confirmed': confirmed }
            )}
          >
            {helper}
          </p>
        )}
      </Elevation>
    );
  }
}
