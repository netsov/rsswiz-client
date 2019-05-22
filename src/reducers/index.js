import * as actions from '../actions';
import { decodeUser } from './utils';

const TWEETS_COUNT = 20;

const tweets = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_TWEETS_SUCCESS:
      return action.append ? [...state, ...action.tweets] : action.tweets;
    case actions.EJECT_FEED:
      return [];
    default:
      return state;
  }
};

const newTweets = (state = 0, action) => {
  switch (action.type) {
    case actions.FETCH_NEW_TWEETS_SUCCESS:
      return action.count;
    case actions.FETCH_TWEETS_SUCCESS:
      return action.append ? state : 0;
    default:
      return state;
  }
};

const allFetched = (state = false, action) => {
  switch (action.type) {
    case actions.FETCH_TWEETS_SUCCESS:
      return action.tweets.length < TWEETS_COUNT;

    default:
      return state;
  }
};

const accounts = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ACCOUNTS_SUCCESS:
      return action.accounts;
    default:
      return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ACCOUNTS_SUCCESS:
      return action.lists;
    default:
      return state;
  }
};

const schedule = (state = { times: [] }, action) => {
  switch (action.type) {
    case actions.UPDATE_SCHEDULE_SUCCESS:
    case actions.FETCH_SCHEDULE_SUCCESS:
      return action.schedule;
    default:
      return state;
  }
};

const feed = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_FEED_SUCCESS:
    case actions.FETCH_FEED_SUCCESS:
      return action.feed;
    case actions.EJECT_FEED:
      return {};
    default:
      return state;
  }
};

const feeds = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_FEEDS_SUCCESS:
      return action.feeds;
    case actions.DELETE_FEED_SUCCESS:
      return state.filter(feed => feed._id !== action.feedId);
    default:
      return state;
  }
};

const fetching = (state = false, action) => {
  switch (action.type) {
    case actions.FETCH_TWEETS_REQUEST:
      return true;
    case actions.FETCH_TWEETS_FAILURE:
    case actions.FETCH_TWEETS_SUCCESS:
      return false;

    default:
      return state;
  }
};

const saving = (state = false, action) => {
  switch (action.type) {
    case actions.UPDATE_FEED_REQUEST:
      return true;
    case actions.UPDATE_FEED_FAILURE:
    case actions.UPDATE_FEED_SUCCESS:
      return false;

    default:
      return state;
  }
};

const user = () => {
  return decodeUser();
};

const drawerIsOpen = (state = false, action) => {
  switch (action.type) {
    case actions.OPEN_DRAWER:
      return true;
    case actions.CLOSE_DRAWER:
      return false;
    default:
      return state;
  }
};

export default {
  tweets,
  newTweets,
  allFetched,
  accounts,
  lists,
  fetching,
  saving,
  user,
  feed,
  feeds,
  schedule,
  drawerIsOpen
};
