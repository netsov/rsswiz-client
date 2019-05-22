import React from 'react';

import Layout from '../../components/Layout';
import Tweets from '../../containers/TweetsContainer';
import FeedEditor from '../../containers/FeedEditorContainer';

const Feed = () => (
  <div>
    <FeedEditor />
    <Tweets />
  </div>
);

export default Layout(Feed, 'feed');
