import { connect } from 'react-redux';

import FeedsList from '../components/FeedList';
import { fetchFeeds, fetchAccounts, deleteFeed } from '../actions';

const mapStateToProps = state => {
  return {
    feeds: state.feeds.sort((a, b) => b.created - a.created),
    accounts: state.accounts,
    lists: state.lists
  };
};

export default connect(mapStateToProps, {
  fetchAccounts,
  fetchFeeds,
  deleteFeed
})(FeedsList);
