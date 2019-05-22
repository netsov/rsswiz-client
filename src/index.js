/*eslint-env node*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import ReactGA from 'react-ga';

import './styles/style.css';
import './styles/theme.css';

import Root from './components/Root';
import store from './store';

import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV === 'production') {
  Raven.config(process.env.REACT_APP_SENTRY_URL).install();
  ReactGA.initialize(process.env.REACT_APP_GA);
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextRoot />
      </Provider>,
      document.getElementById('root')
    );
  });
}
