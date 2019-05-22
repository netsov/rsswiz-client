import { connect } from 'react-redux';

import Progress from '../components/Progress';

const mapStateToProps = state => {
  return {
    show: state.fetching || state.saving,
  };
};

export default connect(mapStateToProps)(Progress);
