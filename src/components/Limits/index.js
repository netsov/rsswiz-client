import React from 'react';

import './style.css';
import ActionButton from '../ActionButton/index';

const limits = [20, 40, 60, 100, 200, 400, 1000];

const Limit = ({ limit, current, onLimitChange }) => {
  return (
    <ActionButton
      raised={true}
      accent={limit === current}
      handleClick={() => limit !== current && onLimitChange(limit)}
    >
      {limit}
    </ActionButton>
  );
};

const Limits = ({ limit: current = 100, updateFeed }) => {
  return (
    <div className="limits-container">
      {limits.map(limit => (
        <Limit
          key={limit}
          limit={limit}
          current={current}
          onLimitChange={limit => updateFeed({ limit })}
        />
      ))}
    </div>
  );
};

export default Limits;
