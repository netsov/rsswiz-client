import { connect } from 'react-redux';

import Accounts from '../components/Accounts';
import { updateFeed, fetchAccounts } from '../actions';

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    usernames: state.feed.usernames,
    // loading: state.fetching || state.saving,
  };
};

export default connect(mapStateToProps, {
  updateFeed,
  fetchAccounts
})(Accounts);
