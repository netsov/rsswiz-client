import React, { Component } from 'react';

import './style.css';
import '@material/toolbar/dist/mdc.toolbar.css';
import * as icons from '../common/icons';
import ActionButton from '../../components/ActionButton';

export default class ToolbarPage extends Component {
  handleMenuClick = e => {
    e.preventDefault();
    const { closeDrawer, openDrawer, drawerIsOpen } = this.props;
    (drawerIsOpen ? closeDrawer : openDrawer)();
  };

  render() {
    return (
      <header className="mdc-toolbar mdc-toolbar mdc-toolbar--fixed">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
            <a
              aria-label="Menu"
              className="mdc-toolbar__icon--menu"
              onClick={this.handleMenuClick}
            >
              <icons.Menu />
            </a>
            <span className="mdc-toolbar__title">RssWiz</span>
          </section>
          <section
            className="mdc-toolbar__section mdc-toolbar__section--align-end"
            role="toolbar"
          >
            <form action="/api/feeds" method="POST">
              <ActionButton
                raised={true}
                aria-label="Create New feed"
                type="submit"
              >
                New feed
              </ActionButton>
            </form>
          </section>
        </div>
      </header>
    );
  }
}
