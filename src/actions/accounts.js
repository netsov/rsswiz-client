import { api } from './utils';

export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

export const fetchAccounts = () => {
  return async dispatch => {
    dispatch({ type: FETCH_ACCOUNTS_REQUEST });

    const response = await api({ path: '/api/accounts' });

    if (response.ok) {
      const { accounts, lists } = await response.json();
      dispatch({
        type: FETCH_ACCOUNTS_SUCCESS,
        accounts,
        lists,
      });
    } else {
      dispatch({
        type: FETCH_ACCOUNTS_FAILURE,
      });
    }
  };
};
