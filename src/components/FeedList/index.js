import React, { Component } from 'react';

import './style.css';

import FeedListItem from '../FeedListItem';

class FeedsList extends Component {
  componentDidMount() {
    this.props.fetchFeeds();
    this.props.fetchAccounts();
  }

  render() {
    const { feeds, accounts, lists, deleteFeed } = this.props;

    return (
      <div className="my-feeds-container">
        <ul>
          {feeds.map(feed => (
            <li key={feed._id} className="my-feed">
              <FeedListItem
                feed={feed}
                accounts={accounts}
                lists={lists}
                onDelete={deleteFeed}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FeedsList;
