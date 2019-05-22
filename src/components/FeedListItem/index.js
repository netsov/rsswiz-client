import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './style.css';

import Elevation from '../Elevation';
import { rssLink } from '../../selectors';
import * as icons from '../common/icons';

const ContentRow = ({ title, children }) => {
  if (
    !children ||
    children.length === 0 ||
    (children.length === 1 && !children[0])
  )
    return null;
  return (
    <div className="my-card-row">
      <strong>
        <small>{title}:</small>
      </strong>&nbsp;
      {children}
    </div>
  );
};

class FeedListItem extends Component {
  state = {
    hovered: false
  };

  onHoverChange = hovered => this.setState({ hovered });

  handleEdit = () => {
    this.props.history.push(`/feeds/${this.props.feed._id}`);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.feed._id);
  };

  render() {
    const { hovered } = this.state;
    const { feed, accounts, lists } = this.props;

    const listNames = lists
      .filter(({ id_str }) => feed.lists.includes(id_str))
      .map(({ full_name }) => full_name);
    const usernames = accounts
      .filter(account => feed.usernames.includes(account.username))
      .map(account => account.username);

    let exclude = [];
    if (feed.exclude_replies) exclude.push('replies');
    if (feed.exclude_retweets) exclude.push('retweets');

    let any = [];
    if (feed.hashtags) any = any.concat(feed.hashtags.map(h => `#${h}`));
    if (feed.url_keywords) any = any.concat(feed.url_keywords);

    let none = [];
    if (feed.hashtags_ne)
      none = none.concat(feed.hashtags_ne.map(h => `#${h}`));
    if (feed.url_keywords_ne) none = none.concat(feed.url_keywords_ne);

    return (
      <Elevation ripple={true} onHoverChange={this.onHoverChange}>
        <div className="my-card-content">
          <div className="my-card-left-column" onClick={this.handleEdit}>
            <ContentRow title="Accounts">
              {usernames &&
                usernames.map(username => (
                  <span key={username}>
                    <small>@{username}</small>&nbsp;
                  </span>
                ))}
            </ContentRow>
            <ContentRow title="Lists">
              {listNames &&
                listNames.map(full_name => (
                  <span key={full_name}>
                    <small>{full_name}</small>&nbsp;
                  </span>
                ))}
            </ContentRow>
            <ContentRow title="Exclude">
              {exclude.length && <small>{exclude.join(', ')}</small>}
            </ContentRow>
            <ContentRow title="Hashtags/domains (any of)">
              {any.length && <small>{any.join(', ')}</small>}
            </ContentRow>
            <ContentRow title="Hashtags/domains (none of)">
              {none.length && <small>{none.join(', ')}</small>}
            </ContentRow>
            <ContentRow title="URL">
              {feed.synced && <small>{rssLink(feed._id)}</small>}
            </ContentRow>
            <ContentRow title="Created">
              {feed.created && (
                <small>
                  {new Date(parseInt(feed.created, 10)).toLocaleString()}
                </small>
              )}
            </ContentRow>
            <ContentRow title="Updated">
              {feed.updated && (
                <small>
                  {new Date(parseInt(feed.updated, 10)).toLocaleString()}
                </small>
              )}
            </ContentRow>
            <ContentRow title="Synced">
              {feed.synced && (
                <small>
                  {new Date(parseInt(feed.synced, 10)).toLocaleString()}
                </small>
              )}
            </ContentRow>
          </div>

          {hovered && (
            <nav>
              <span
                className="my-icon"
                aria-label="Edit feed"
                onClick={this.handleEdit}
              >
                <icons.Edit />&nbsp;&nbsp;
              </span>
              <span
                className="my-icon"
                aria-label="Delete feed"
                onClick={this.handleDelete}
              >
                <icons.Delete />
              </span>
            </nav>
          )}
        </div>
      </Elevation>
    );
  }
}

export default withRouter(FeedListItem);
