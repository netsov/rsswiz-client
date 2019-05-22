import React from 'react';

import './style.css';
import Schedule from '../../containers/ScheduleContainer';
import Email from '../../containers/EmailContainer';

const Settings = () => (
  <div className="my-settings-container">
    <Email />
    <Schedule />
  </div>
);

export default Settings;
