import React from 'react';
import $script from 'scriptjs';
import isEqual from 'lodash.isequal';

import './style.css';
import ActionButton from '../ActionButton';

class Tweets extends React.Component {
  state = {
    showMore: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props.tweets, nextProps.tweets) ||
      this.props.allFetched !== nextProps.allFetched ||
      this.state.showMore !== nextState.showMore
    );
  }

  componentWillReceiveProps() {
    this.setState({ showMore: false });
  }

  componentDidMount() {
    $script('//platform.twitter.com/widgets.js', 'widgets');
    this.injectTwiiterWidgets(this.props.tweets);
  }

  componentDidUpdate(prevProps) {
    const newTweets = this.props.tweets.filter(
      newTweet =>
        !prevProps.tweets.find(
          prevTweet => this.tweetToId(newTweet) === this.tweetToId(prevTweet)
        )
    );
    this.injectTwiiterWidgets(newTweets);
  }

  injectTwiiterWidgets(tweets) {
    if (!tweets.length) {
      this.setState({ showMore: true });
      return;
    }
    $script.ready('widgets', async () => {
      const tweetsToInject = tweets
        .map(tweet => [tweet, document.getElementById(this.tweetToId(tweet))])
        .filter(
          ([tweetId, parentNode]) => // eslint-disable-line no-unused-vars
            parentNode && parentNode.childNodes.length === 0
        );
      await Promise.all(
        tweetsToInject.map(([tweetId, parentNode]) => {
          return window.twttr.widgets.createTweet(tweetId, parentNode);
        })
      );
      this.setState({ showMore: true });
    });
  }

  handleShowMore = () => {
    const { tweets } = this.props;
    const maxId = tweets[tweets.length - 1];
    this.props.fetchTweets(maxId);
  };

  handleShowNew = () => {
    this.props.fetchAccounts();
    this.props.fetchFeed(this.props.feedId);
    this.props.fetchTweets();
  };

  tweetToId = tweetId => tweetId;

  render() {
    const { tweets, allFetched, newTweets } = this.props;
    const showMore = tweets.length && this.state.showMore && !allFetched;
    return tweets.length ? (
      <div className="my-tweets-container">
        {newTweets ? (
          <ActionButton
            handleClick={this.handleShowNew}
          >
            View {newTweets} new Tweet{newTweets > 1 ? 's' : ''}
          </ActionButton>
        ) : null}
        {tweets.map(tweet => (
          <div
            className=""
            key={this.tweetToId(tweet)}
            id={this.tweetToId(tweet)}
          />
        ))}
        {showMore ? (
          <ActionButton
            handleClick={this.handleShowMore}
          >
            More
          </ActionButton>
        ) : null}
      </div>
    ) : null;
  }
}

export default Tweets;
