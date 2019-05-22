import { connect } from 'react-redux';

import Email from '../components/Email/index';
import { updateEmail, confirmEmail } from '../actions';

const mapStateToProps = state => {
  const email = state.user.email;
  return {
    confirmed: email && email.confirmed,
    email: email && email.value,
  };
};

export default connect(mapStateToProps, {
  updateEmail,
  confirmEmail,
})(Email);
