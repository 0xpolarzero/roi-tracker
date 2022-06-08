import React from 'react';

class PeriodConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { trackROI } = this.props;
    return (
      <div className='period-config'>
        <i className='addresses-icon fa-solid fa-hourglass'></i>
        <div className='title'>Time period</div>
        <div className='period'>
          <button className='period-hour' onClick={() => trackROI('lastHour')}>
            Last hour
          </button>
          <button className='period-day' onClick={() => trackROI('today')}>
            Today
          </button>
          <button className='period-week' onClick={() => trackROI('lastWeek')}>
            Last 7 days
          </button>
        </div>
      </div>
    );
  }
}

export default PeriodConfig;
