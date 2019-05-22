/*eslint-env node*/
import React from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';

import { getFeedQueryParams } from '../../actions/utils';

import Accounts from '../../containers/AccountsContainer';
import Lists from '../../containers/ListsContainer';
import Filter from '../../containers/FilterContainer';
import Limits from '../../containers/LimitContainer';
import URL from '../../containers/URLContainer';

import './style.css';
import '@material/tabs/dist/mdc.tabs.css';
import Elevation from '../Elevation';

// const wsUrl = `wss://www.rsswiz.${process.env.NODE_ENV === 'development'
//   ? 'dev'
//   : 'com'}:443/ws/`;

const wsUrl =
  process.env.NODE_ENV === 'development'
    ? 'ws://www.rsswiz.test/ws/'
    : 'wss://www.rsswiz.com:443/ws/';

const Tabs = ({ tabs, active }) => (
  <nav className="mdc-tab-bar">
    {tabs.map(tab => (
      <a
        key={tab}
        className={classNames({
          'mdc-tab': true,
          'mdc-tab--active': active === tab
        })}
        href={`#${tab}`}
        aria-label={tab}
      >
        {tab}
      </a>
    ))}
    <span className="mdc-tab-bar__indicator" />
  </nav>
);

class FeedEditor extends React.PureComponent {
  static defaultProps = {
    activeTab: 'Accounts'
  };
  state = {
    liveSearch: true,
    showLink: false
  };

  tabs = {
    Accounts: () => <Accounts />,
    Lists: () => <Lists />,
    Filter: () => <Filter />,
    Limit: () => <Limits />,
    URL: () => <URL />
  };

  constructor(ctx) {
    super(ctx);
    this.ws = null;
  }

  async componentDidMount() {
    this.props.fetchAccounts();
    this.props.fetchFeed(this.props.feedId);
    this.listenServerEvents();
  }

  handleWsEvent() {
    this.props.fetchAccounts();
    this.props.fetchFeed(this.props.feedId);
    if (this.props.noTweets) {
      this.props.fetchTweets();
    } else {
      this.props.fetchNewTweets();
    }
  }

  listenServerEvents() {
    const ws = new WebSocket(wsUrl);
    ws.addEventListener('message', () => {
      // JSON.parse(event.data)
      this.handleWsEvent();
    });
    ws.addEventListener('open', () => {
      // console.warn('ws opened');
    });
    ws.addEventListener('close', e => {
      // console.warn('ws closed', e.code);
      if (e.code !== 1000) setTimeout(() => this.listenServerEvents(), 2000);
    });
    this.ws = ws;
  }

  componentWillUnmount() {
    if (this.ws) this.ws.close();
    this.props.ejectFeed();
  }

  componentWillReceiveProps() {
    this.setState({ showLink: false });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.state.liveSearch &&
      !isEqual(
        getFeedQueryParams(prevProps.feed),
        getFeedQueryParams(this.props.feed)
      )
    ) {
      await this.props.fetchTweets();
    }
  }

  render() {
    return (
      <div className="editor-page-wrapper">
        <Tabs tabs={Object.keys(this.tabs)} active={this.props.activeTab} />
        <br />
        <Elevation>{this.tabs[this.props.activeTab]()}</Elevation>
      </div>
    );
  }
}

export default FeedEditor;
