import React from 'react';

import './style.css';
import '@material/button/dist/mdc.button.css';
import ActionButton from '../ActionButton';
import Switch from '../Switch';

const Account = ({ username, checked, disabled, expired, total, onToggle }) => (
  <li className="account-row">
    <Switch
      label={`@${username}${expired ? ' (!)' : total ? ` (${total})` : ''}`}
      value={username}
      onToggle={onToggle}
      checked={!!checked}
      disabled={disabled}
    />
  </li>
);

export default class Accounts extends React.Component {
  static defaultProps = {
    accounts: [],
    usernames: [],
  };

  handleUsernameToggle = username => () => {
    const { usernames: prev } = this.props;
    const usernames = prev.includes(username)
      ? prev.filter(u => u !== username)
      : [...prev, username];

    this.props.updateFeed({ usernames });
  };

  render() {
    const { accounts, usernames, loading } = this.props;
    if (!usernames && !accounts) return null;
    return (
      <div className="accounts-container">
        <ul>
          {accounts.map(({ username, total, expired }) => (
            <Account
              key={username}
              username={username}
              disabled={expired || loading}
              checked={usernames.includes(username)}
              expired={expired}
              total={total}
              onToggle={this.handleUsernameToggle}
            />
          ))}
        </ul>
        <br />
        <form action="/auth/twitter" method="POST">
          <ActionButton type="submit" aria-label="Add twitter account">
            Add account
          </ActionButton>
        </form>
      </div>
    );
  }
}
