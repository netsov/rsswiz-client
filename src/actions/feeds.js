import { api } from './utils';

export const EJECT_FEED = 'EJECT_FEED';

export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';

export const DELETE_FEED_REQUEST = 'DELETE_FEED_REQUEST';
export const DELETE_FEED_SUCCESS = 'DELETE_FEED_SUCCESS';
export const DELETE_FEED_FAILURE = 'DELETE_FEED_FAILURE';

export const FETCH_FEEDS_REQUEST = 'FETCH_FEEDS_REQUEST';
export const FETCH_FEEDS_SUCCESS = 'FETCH_FEEDS_SUCCESS';
export const FETCH_FEEDS_FAILURE = 'FETCH_FEEDS_FAILURE';

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST';
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS';
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE';

export const UPDATE_FEED_REQUEST = 'UPDATE_FEED_REQUEST';
export const UPDATE_FEED_SUCCESS = 'UPDATE_FEED_SUCCESS';
export const UPDATE_FEED_FAILURE = 'UPDATE_FEED_FAILURE';

export const fetchFeed = feedId => {
  return async dispatch => {
    dispatch({ type: FETCH_FEED_REQUEST });

    const response = await api({ path: `/api/feeds/${feedId}` });

    if (response.ok) {
      dispatch({
        type: FETCH_FEED_SUCCESS,
        feed: await response.json()
      });
    } else {
      dispatch({
        type: FETCH_FEED_FAILURE
      });
    }
  };
};

export const fetchFeeds = () => {
  return async dispatch => {
    dispatch({ type: FETCH_FEEDS_REQUEST });

    const response = await api({ path: '/api/feeds' });

    if (response.ok) {
      dispatch({
        type: FETCH_FEEDS_SUCCESS,
        feeds: await response.json()
      });
    } else {
      dispatch({
        type: FETCH_FEEDS_FAILURE
      });
    }
  };
};

export const createFeed = payload => {
  return async dispatch => {
    dispatch({ type: CREATE_FEED_REQUEST });

    const response = await api({
      path: '/api/feeds',
      method: 'POST',
      body: payload
    });

    if (response.ok) {
      dispatch({
        type: CREATE_FEED_SUCCESS,
        feed: await response.json()
      });
    } else {
      dispatch({
        type: CREATE_FEED_FAILURE
      });
    }
  };
};

export const updateFeed = payload => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_FEED_REQUEST });

    const response = await api({
      path: `/api/feeds/${getState().feed._id}`,
      method: 'PUT',
      body: payload
    });

    if (response.ok) {
      dispatch({
        type: UPDATE_FEED_SUCCESS,
        feed: await response.json()
      });
    } else {
      dispatch({
        type: UPDATE_FEED_FAILURE
      });
    }
  };
};

export const deleteFeed = feedId => {
  return async dispatch => {
    dispatch({ type: DELETE_FEED_REQUEST });

    const response = await api({
      path: `/api/feeds/${feedId}`,
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch({
        type: DELETE_FEED_SUCCESS,
        feedId
      });
    } else {
      dispatch({
        type: DELETE_FEED_FAILURE
      });
    }
  };
};

export const ejectFeed = () => {
  return {
    type: EJECT_FEED
  };
};
