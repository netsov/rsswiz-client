import { connect } from 'react-redux';

import Lists from '../components/Lists';
import { updateFeed, fetchAccounts } from '../actions';

const mapStateToProps = state => {
  return {
    listsAll: state.lists.map(list => ({
      ...list,
      expired: !!state.accounts.find(
        account => account.id === list.accountId && account.expired
      ),
    })),
    usernames: state.feed.usernames,
    lists: state.feed.lists,
    // loading: state.fetching || state.saving,
  };
};

export default connect(mapStateToProps, {
  updateFeed,
  fetchAccounts,
})(Lists);
