import React, { Component } from 'react';

import './style.css';
import ActionButton from '../ActionButton';
import Elevation from '../Elevation';

export default class Schedule extends Component {
  componentDidMount() {
    this.props.fetchSchedule();
  }
  handleTimeClick = (i, period) => {
    if (period === 'pm') i += 12;
    let { updateSchedule, schedule: { times = [] } } = this.props;
    const matched = times.find(t => t.i === i);
    if (matched) {
      matched.on = !matched.on;
    } else {
      times.push({
        i,
        on: true,
        utcHours: new Date(new Date().setHours(i)).getUTCHours()
      });
    }
    updateSchedule({ times });
  };

  render() {
    const { confirmed, schedule: { times = [] } } = this.props;
    return (
      <Elevation>
        <div className="schedule-container">
          <header>
            <div>
              <strong>Subscription</strong>
              <br />
              <small>
                Choose a time if you want to receive emails with RSS feed URL
              </small>
            </div>
          </header>

          <div>
            {['am', 'pm'].map(period => (
              <div key={period} className="times-row">
                <div className="period-container">
                  <ActionButton disabled={true}>
                    {period.toUpperCase()}
                  </ActionButton>
                </div>

                <div className="times-container">
                  {Array.from(Array(12).keys()).map(i => (
                    <ActionButton
                      key={i}
                      raised={true}
                      accent={times.find(
                        t => t.on && t.i === i + (period === 'pm' ? 12 : 0)
                      )}
                      handleClick={() =>
                        confirmed && this.handleTimeClick(i, period)}
                      disabled={!confirmed}
                    >
                      {`${(i === 0 ? 12 : i).toString()}:00`}
                    </ActionButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Elevation>
    );
  }
}
