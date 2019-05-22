import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import * as icons from '../common/icons';

const RouterLink = ({ to, icon, name, onClick }) => (
  <NavLink
    to={to}
    className="mdc-list-item"
    activeClassName="mdc-persistent-drawer--selected"
    onClick={onClick}
    aria-label={name}
  >
    <div className="persistent-link-container">
      {icon}
      <small>{name}</small>
    </div>
  </NavLink>
);

const Persistent = () => {
  let input;
  return (
    <aside>
      <nav className="persistent">
        <RouterLink to="/feeds" icon={<icons.Rss />} name="Feeds" />
        <RouterLink to="/settings" icon={<icons.Settings />} name="Settings" />
        <form action="/auth/logout" method="POST">
          <RouterLink
            to="/logout"
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
    </aside>
  );
};

export default Persistent;
