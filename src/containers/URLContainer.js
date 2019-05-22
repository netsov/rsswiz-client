import { connect } from 'react-redux';

import URL from '../components/URL/index';

const mapStateToProps = state => {
  return {
    rssId: state.feed.synced ? state.feed._id : null,
  };
};

export default connect(mapStateToProps)(URL);
