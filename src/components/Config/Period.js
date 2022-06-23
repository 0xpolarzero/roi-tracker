import React from 'react';

class PeriodConfig extends React.Component {
  constructor() {
    super();

    this.state = {
      dateFrom: '',
      dateTo: '',
    };
  }

  handleDateChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { trackROI, includeTransfers } = this.props;
    return (
      <div className='card period-config config-item'>
        <div className='header'>
          <div className='title'>
            <i className='config-icon fa-solid fa-hourglass'></i>Time period
          </div>
        </div>
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
        <div className='period-custom'>
          <div className='sub-title'>Custom time period ↓</div>
          <div className='period-custom-picker'>
            <div className='period-custom-from'>
              <input
                type='datetime-local'
                name='dateFrom'
                id='date-from'
                value={this.state.dateFrom}
                onChange={this.handleDateChange}
                max={this.state.dateTo}
              />
            </div>
            <div className='period-custom-to'>
              <input
                type='datetime-local'
                name='dateTo'
                id='date-to'
                value={this.state.dateTo}
                onChange={this.handleDateChange}
                min={this.state.dateFrom}
              />
            </div>
          </div>
          <button
            className='period-custom-btn'
            onClick={() =>
              trackROI('custom', this.state.dateFrom, this.state.dateTo)
            }
          >
            Track
          </button>
        </div>
      </div>
    );
  }
}

export default PeriodConfig;
