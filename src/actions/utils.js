import { decodeUser } from '../reducers/utils';

export const api = async ({ path, params, method = 'GET', body }) => {
  const headers = {
    Accept: 'application/json',
  };
  if (body) headers['Content-Type'] = 'application/json';

  if (params) {
    const query = Object.keys(params)
      .filter(key => !!params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&');
    if (query) path += '?' + query;
  }

  const response = await fetch(path, {
    credentials: 'include',
    method,
    headers,
    body: JSON.stringify(body),
    json: !!body,
  });

  if (!decodeUser()) window.location.reload();

  return response;
};

export const getFeedQueryParams = ({
  usernames = [],
  lists = [],
  url_keywords = [],
  url_keywords_ne = [],
  hashtags = [],
  hashtags_ne = [],
  exclude_replies = false,
  exclude_retweets = false,
}) => {
  const toParam = (arr, arr_ne) => {
    const params = arr.concat(arr_ne.map(i => '-' + i));
    return params.length > 0 && params.join(',');
  };

  return {
    usernames: usernames.join(','),
    lists: lists.join(','),
    url_keywords: toParam(url_keywords, url_keywords_ne),
    hashtags: toParam(hashtags, hashtags_ne),
    exclude_replies,
    exclude_retweets,
  };
};
