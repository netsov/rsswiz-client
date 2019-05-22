import React from 'react';

import './style.css';
import Switch from '../Switch';

const List = ({
  fullName,
  listId,
  total,
  expired,
  checked,
  disabled,
  onToggle
}) => (
  <li className="list-row">
    <Switch
      label={`${fullName}${expired
        ? ' (!)'
        : total ? ` (${total})` : ''}`}
      value={listId}
      onToggle={onToggle}
      checked={!!checked}
      disabled={disabled}
    />
  </li>
);

export default class Lists extends React.Component {
  static defaultProps = {
    accounts: [],
    usernames: [],
    lists: []
  };

  handleListToggle = listId => () => {
    const { lists: prev } = this.props;
    const lists = prev.includes(listId)
      ? prev.filter(u => u !== listId)
      : [...prev, listId];

    this.props.updateFeed({ lists });
  };

  render() {
    const { listsAll, lists, loading } = this.props;
    return listsAll.length ? (
      <div className="lists-container">
        <ul>
          {listsAll.map(
            ({ full_name: fullName, id_str: listId, total, expired }) => (
              <List
                key={listId}
                fullName={fullName}
                listId={listId}
                disabled={expired || loading}
                checked={lists.includes(listId)}
                expired={expired}
                total={total}
                onToggle={this.handleListToggle}
              />
            )
          )}
        </ul>
      </div>
    ) : (
      <small>Subscribe to a list. Once you do, they`ll all show up here.</small>
    );
  }
}
