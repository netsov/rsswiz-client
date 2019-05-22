import React from 'react';
import { rssLink } from '../../selectors/index';

import './style.css';

const Url = ({ rssId }) => {
  return (
    <div className="url-container">
      {rssId ? (
        <a href={`/rss/${rssId}`} target="_blank">
          {rssLink(rssId)}
        </a>
      ) : (
        <small>Your RSS Feed URL will show up here.</small>
      )}
    </div>
  );
};

export default Url;
