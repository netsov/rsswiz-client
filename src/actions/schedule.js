import { api } from './utils';

export const FETCH_SCHEDULE_REQUEST = 'FETCH_SCHEDULE_REQUEST';
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE';

export const UPDATE_SCHEDULE_REQUEST = 'UPDATE_SCHEDULE_REQUEST';
export const UPDATE_SCHEDULE_SUCCESS = 'UPDATE_SCHEDULE_SUCCESS';
export const UPDATE_SCHEDULE_FAILURE = 'UPDATE_SCHEDULE_FAILURE';

export const fetchSchedule = () => {
  return async dispatch => {
    dispatch({ type: FETCH_SCHEDULE_REQUEST });

    const response = await api({ path: '/api/schedule' });

    if (response.ok) {
      dispatch({
        type: FETCH_SCHEDULE_SUCCESS,
        schedule: await response.json(),
      });
    } else {
      dispatch({
        type: FETCH_SCHEDULE_FAILURE,
      });
    }
  };
};

export const updateSchedule = ({ times }) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_SCHEDULE_REQUEST });

    const response = await api({
      path: '/api/schedule',
      method: 'PUT',
      body: {
        times: times || getState().schedule.times,
      },
    });

    if (response.ok) {
      dispatch({
        type: UPDATE_SCHEDULE_SUCCESS,
        schedule: await response.json(),
      });
    } else {
      dispatch({
        type: UPDATE_SCHEDULE_FAILURE,
      });
    }
  };
};
