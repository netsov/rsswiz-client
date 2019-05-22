import { connect } from 'react-redux';

import Toolbar from '../components/Toolbar';
import { closeDrawer, openDrawer } from '../actions';

const mapStateToProps = state => {
  return {
    drawerIsOpen: state.drawerIsOpen,
  };
};

export default connect(mapStateToProps, {
  closeDrawer,
  openDrawer,
})(Toolbar);
