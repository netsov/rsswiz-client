import { api } from './utils';

export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

export const updateEmail = email => {
  return async dispatch => {
    dispatch({ type: UPDATE_EMAIL_REQUEST });

    const response = await api({
      path: '/api/email',
      method: 'PUT',
      body: { email },
    });

    if (response.ok) {
      dispatch({
        type: UPDATE_EMAIL_SUCCESS,
      });
    } else {
      dispatch({
        type: UPDATE_EMAIL_FAILURE,
      });
    }
  };
};

export const confirmEmail = () => {
  return async dispatch => {
    dispatch({ type: CONFIRM_EMAIL_REQUEST });

    const response = await api({
      path: '/api/confirmation',
      method: 'POST',
    });

    if (response.ok) {
      dispatch({
        type: CONFIRM_EMAIL_SUCCESS,
      });
    } else {
      dispatch({
        type: CONFIRM_EMAIL_FAILURE,
      });
    }
  };
};
