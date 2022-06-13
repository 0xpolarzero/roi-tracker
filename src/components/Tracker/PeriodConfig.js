import React from 'react';

class PeriodConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { trackROI, includeTransfers } = this.props;
    return (
      <div className='period-config'>
        <i className='config-icon fa-solid fa-hourglass'></i>
        <div className='title'>Time period</div>
        <div className='period-select'>
          <button className='period-hour' onClick={() => trackROI('lastHour')}>
            <i className='fa-solid fa-truck-fast'></i> Last hour
          </button>
          <button className='period-day' onClick={() => trackROI('today')}>
            <i className='fa-solid fa-calendar-day'></i> Today
          </button>
          <button className='period-week' onClick={() => trackROI('lastWeek')}>
            <i className='fa-solid fa-road'></i> Last 7 days
          </button>
        </div>
      </div>
    );
  }
}

export default PeriodConfig;
