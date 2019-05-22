import { connect } from 'react-redux';

import { deleteNotification } from '../actions/notifications';
import Notifications from '../components/Notifications/index';

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { deleteNotification })(Notifications);
