import React from 'react';

import './style.css';
import { Cancel } from '../common/icons';

const Chip = ({ children, onDelete }) => (
  <span className="mdl-chip mdl-chip--deletable">
    <span className="mdl-chip__text">{children}</span>
    <a
      className="mdl-chip__action"
      aria-label={`delete ${children}`}
      onClick={onDelete}
    >
      <Cancel />
    </a>
  </span>
);

const Chips = ({ tags, onDelete }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div>
      {tags.map(tag => (
        <Chip key={tag} onDelete={() => onDelete(tag)}>
          {tag}
        </Chip>
      ))}
    </div>
  );
};

export default Chips;
