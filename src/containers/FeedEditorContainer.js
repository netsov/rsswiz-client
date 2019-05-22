import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FeedEditor from '../components/FeedEditor';
import {
  fetchTweets,
  fetchFeed,
  fetchNewTweets,
  fetchAccounts,
  ejectFeed,
} from '../actions';

const mapStateToProps = (state, props) => {
  return {
    feed: state.feed,
    feedId: props.match.params.id,
    noTweets: state.tweets.length === 0,
    activeTab: window.location.hash.substr(1) || undefined,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchAccounts,
    fetchTweets,
    fetchNewTweets,
    fetchFeed,
    ejectFeed,
  })(FeedEditor)
);
