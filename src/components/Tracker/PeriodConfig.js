import React from 'react';

class PeriodConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { trackROI, changeDate } = this.props;
    return (
      <div className='period-config'>
        <i className='addresses-icon fa-solid fa-hourglass'></i>
        <form onSubmit={trackROI}>
          <div className='title'>Time period</div>
          <div className='period'>
            <div className='period-custom'>
              <span>From</span>
              <input
                onChange={changeDate}
                type='datetime-local'
                id='date-from'
              />
              <span>To</span>
              <input onChange={changeDate} type='datetime-local' id='date-to' />
            </div>
          </div>
          <button type='submit'>Track</button>
        </form>
        <span>or</span>
        <div className='period-fixed'>
          <button className='period-hour' onClick={() => trackROI('lastHour')}>
            Last hour
          </button>
          <button className='period-day' onClick={() => trackROI('today')}>
            Today
          </button>
        </div>
      </div>
    );
  }
}

export default PeriodConfig;
