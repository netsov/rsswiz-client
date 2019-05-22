import React from 'react';

import '@material/card/dist/mdc.card.css';

const Card = ({ children }) => (
  <div className="mdc-card">
    <section className="mdc-card__primary">{children}</section>
  </div>
);

export default Card;
