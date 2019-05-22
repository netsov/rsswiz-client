import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Tweets from '../components/Tweets';
import { fetchTweets, fetchAccounts, fetchFeed } from '../actions';

const mapStateToProps = (state, props) => {
  return {
    tweets: state.tweets,
    newTweets: state.newTweets,
    allFetched: state.allFetched,
    feedId: props.match.params.id,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchTweets,
    fetchAccounts,
    fetchFeed,
  })(Tweets)
);
