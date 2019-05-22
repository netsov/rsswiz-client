import React, { Component } from 'react';

import '@material/dialog/dist/mdc.dialog.css';

const Notification = ({ onDelete, children }) => (
  <aside
    className="mdc-dialog mdc-dialog--open"
    role="alertdialog"
    aria-labelledby="mdc-dialog-default-label"
    aria-describedby="mdc-dialog-default-description"
  >
    <div className="mdc-dialog__surface">
      <header className="mdc-dialog__header">
        <h2 className="mdc-dialog__header__title">Something went wrong</h2>
      </header>
      <section className="mdc-dialog__body">{children}</section>
      <footer className="mdc-dialog__footer">
        <button
          type="button"
          className="mdc-button mdc-dialog__footer__button"
          onClick={onDelete}
          aria-label="Close notification"
        >
          Ok
        </button>
      </footer>
    </div>
    <div className="mdc-dialog__backdrop" />
  </aside>
);

export default class Notifications extends Component {
  handleDelete = notificationId => () => {
    this.props.deleteNotification(notificationId);
  };
  render() {
    const { notifications } = this.props.user;
    if (!notifications || !notifications.length) return null;
    return (
      <div>
        {notifications.map(({ id, text }) => (
          <Notification key={id} onDelete={this.handleDelete(id)}>
            {text}
          </Notification>
        ))}
      </div>
    );
  }
}
