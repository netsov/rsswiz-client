import { connect } from 'react-redux';

import Limits from '../components/Limits/index';
import { updateFeed } from '../actions';

const mapStateToProps = state => {
  return {
    limit: state.feed.limit,
  };
};

export default connect(mapStateToProps, {
  updateFeed,
})(Limits);
