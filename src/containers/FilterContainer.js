import { connect } from 'react-redux';

import Filter from '../components/Filter/Filter';
import { updateFeed } from '../actions';

const mapStateToProps = state => {
  return {
    url_keywords: state.feed.url_keywords,
    url_keywords_ne: state.feed.url_keywords_ne,
    hashtags: state.feed.hashtags,
    hashtags_ne: state.feed.hashtags_ne,
    exclude_replies: state.feed.exclude_replies,
    exclude_retweets: state.feed.exclude_retweets,
    // loading: state.fetching || state.saving,
  };
};

export default connect(mapStateToProps, {
  updateFeed,
})(Filter);
