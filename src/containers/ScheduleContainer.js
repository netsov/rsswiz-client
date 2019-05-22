import { connect } from 'react-redux';

import Schedule from '../components/Schedule/index';
import { fetchSchedule, updateSchedule } from '../actions';

const mapStateToProps = state => {
  const email = state.user.email && state.user.email.value;
  return {
    confirmed: email && state.user.email.confirmed,
    schedule: state.schedule,
  };
};

export default connect(mapStateToProps, {
  fetchSchedule,
  updateSchedule,
})(Schedule);
