import React from 'react';
import EvolutionTable from './EvolutionTable';
import { TimestampConverter } from '../../systems/timestamp';

class Result extends React.Component {
  constructor() {
    super();
  }

  displayPeriod = (time) => {
    const start = TimestampConverter()
      .timestampToDate(time.from)
      .toLocaleString();
    const end = TimestampConverter().timestampToDate(time.to).toLocaleString();

    if (start === 'Invalid Date' || end === 'Invalid Date') {
      return 'No period selected.';
    }
    return (
      <span>
        Showing data from <span className='highlight'>{start}</span> to{' '}
        <span className='highlight'>{end}</span>.
      </span>
    );
  };

  render() {
    const { period, balance, loading, ethPriceValue } = this.props;

    if (loading) {
      return (
        <div className='result'>
          <div className='loading'>Loading...</div>
        </div>
      );
    } else {
      return (
        <div className='result'>
          <div className='hint'>{this.displayPeriod(period)}</div>
          <EvolutionTable
            balance={balance}
            date={period}
            ethPriceValue={ethPriceValue}
          />
        </div>
      );
    }
  }
}

export default Result;
