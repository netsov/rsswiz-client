import React, { Component } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import * as icons from '../common/icons';
import './style.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';

const Footer = () => (
  <footer className="drawer-footer">
    <span>&copy; 2017 Alexey Kuznetsov</span>
    <a href="mailto:rsswizcom@gmail.com" target="_top">
      rsswizcom@gmail.com
    </a>
  </footer>
);

const RouterLink = ({ children, to, icon, name, onClick }) => (
  <NavLink
    to={to}
    className="mdc-list-item"
    activeClassName="mdc-temporary-drawer--selected"
    onClick={onClick}
    aria-label={name}
  >
    <span className="mdc-list-item__start-detail">{icon}</span>
    {name}
  </NavLink>
);

export default class extends Component {
  closeDrawer = () => {
    this.props.closeDrawer();
  };
  render() {
    const { show } = this.props;
    let input;
    return (
      <aside
        className={classNames({
          'mdc-temporary-drawer': true,
          'mdc-temporary-drawer--open': show,
        })}
        onClick={this.closeDrawer}
      >
        <nav className="mdc-temporary-drawer__drawer">
          <div className="mdc-temporary-drawer__toolbar-spacer" />
          <div className="mdc-list-group">
            <nav className="mdc-list">
              <RouterLink to="/feeds" icon={<icons.Rss />} name="Feeds" />
              <RouterLink
                to="/settings"
                icon={<icons.Settings />}
                name="Settings"
              />
            </nav>
            <hr className="mdc-list-divider" />
            <nav className="mdc-list">
              <form action="/auth/logout" method="POST">
                <RouterLink
                  to="/auth/logout"
                  icon={<icons.Logout />}
                  name="Logout"
                  onClick={e => {
                    e.preventDefault();
                    input.click();
                  }}
                />
                <input type="submit" hidden="hidden" ref={i => (input = i)} />
              </form>
            </nav>
          </div>
        </nav>
        {show ? <Footer /> : null}
      </aside>
    );
  }
}
