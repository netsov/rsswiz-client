import React from 'react';

import './style.css';
import ActionButton from '../../components/ActionButton';

import { trackGA } from '../../utils';

const EmojiCheck = () => (
  <span role="img" aria-label="check">
    ✔
  </span>
);

const EmojiFire = () => (
  <span role="img" aria-label="fire">
    🔥
  </span>
);

const Landing = () => {
  trackGA('');
  return (
    <div className="landing">
      <div className="legend">
        <h1>Twitter Feed</h1>
        <h2>
          <EmojiCheck />&nbsp;Connect multiple twitter accounts and lists
        </h2>
        <h2>
          <EmojiCheck />&nbsp;Mash them together
        </h2>
        <h2>
          <EmojiCheck />&nbsp;Apply filters (#hashtags, domains, retweets,
          replies and more)
        </h2>
        <h2>
          <EmojiCheck />&nbsp;Export to RSS
        </h2>
        <h2>
          <EmojiFire />&nbsp;Try it free!
        </h2>
        <form action="/auth/twitter" method="POST">
          <ActionButton raised={true} type="submit">
            Log In with Twitter
          </ActionButton>
        </form>
      </div>
    </div>
  );
};

export default Landing;
