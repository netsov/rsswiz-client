import { connect } from 'react-redux';

import { closeDrawer } from '../actions';
import TemporaryDrawer from '../components/Drawer/temporary';

const mapStateToProps = state => {
  return {
    show: state.drawerIsOpen,
  };
};

export default connect(mapStateToProps, { closeDrawer })(TemporaryDrawer);
