import { api, getFeedQueryParams } from './utils';

export const FETCH_TWEETS_REQUEST = 'FETCH_TWEETS_REQUEST';
export const FETCH_TWEETS_SUCCESS = 'FETCH_TWEETS_SUCCESS';
export const FETCH_TWEETS_FAILURE = 'FETCH_TWEETS_FAILURE';

export const FETCH_NEW_TWEETS_REQUEST = 'FETCH_NEW_TWEETS_REQUEST';
export const FETCH_NEW_TWEETS_SUCCESS = 'FETCH_NEW_TWEETS_SUCCESS';
export const FETCH_NEW_TWEETS_FAILURE = 'FETCH_NEW_TWEETS_FAILURE';

export const fetchTweets = maxId => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_TWEETS_REQUEST });

    const params = getFeedQueryParams(getState().feed);
    if (maxId) params.maxId = maxId;

    const response = await api({ path: '/api/tweets', params });

    if (response.ok) {
      dispatch({
        type: FETCH_TWEETS_SUCCESS,
        tweets: await response.json(),
        append: !!maxId,
      });
    } else {
      dispatch({
        type: FETCH_TWEETS_FAILURE,
      });
    }
  };
};

export const fetchNewTweets = () => {
  return async (dispatch, getState) => {
    const latestTweetId = getState().tweets[0];
    if (!latestTweetId) return;
    dispatch({ type: FETCH_NEW_TWEETS_REQUEST });

    const params = getFeedQueryParams(getState().feed);
    params.sinceId = latestTweetId;

    const response = await api({ path: '/api/tweets/new', params });

    if (response.ok) {
      dispatch({
        type: FETCH_NEW_TWEETS_SUCCESS,
        count: (await response.json()).count,
      });
    } else {
      dispatch({
        type: FETCH_NEW_TWEETS_FAILURE,
      });
    }
  };
};
