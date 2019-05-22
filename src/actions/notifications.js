import { api } from './utils';

export const DELETE_NOTIFICATION_REQUEST = 'DELETE_NOTIFICATION_REQUEST';
export const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
export const DELETE_NOTIFICATION_FAILURE = 'DELETE_NOTIFICATION_FAILURE';

export const deleteNotification = notificationId => {
  return async dispatch => {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });

    const response = await api({
      path: `/api/notifications/${notificationId}`,
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
      });
    } else {
      dispatch({
        type: DELETE_NOTIFICATION_FAILURE,
      });
    }
  };
};
