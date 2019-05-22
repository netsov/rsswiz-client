import React from 'react';

import './style.css';
import Toolbar from '../../containers/ToolbarContainer';
import PersistentDrawer from '../../components/Drawer/persistent';
import TemporaryDrawer from '../../containers/DrawerContainer';
import Progress from '../../containers/ProgressContainer';
import NotificationsContainer from '../../containers/NotificationsContainer';
import { trackGA } from '../../utils';

// eslint-disable-next-line react/display-name
const Layout = (Page, route) => () => {
  trackGA(route);
  return (
    <div>
      <Progress />
      <Toolbar />
      <TemporaryDrawer />
      <PersistentDrawer />
      <main className="mdc-toolbar-fixed-adjust">
        <NotificationsContainer />
        <Page />
      </main>
    </div>
  );
};

export default Layout;
