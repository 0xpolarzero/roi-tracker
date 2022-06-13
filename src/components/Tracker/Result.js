import React from 'react';
import EvolutionTable from './EvolutionTable';
import { TimestampConverter } from '../../systems/timestamp';

class Result extends React.Component {
  constructor() {
    super();
  }

  getPeriod = (time) => {
    const start = TimestampConverter()
      .timestampToDate(time.from)
      .toLocaleString();
    if (start === 'Invalid Date') {
      return 'No period selected.';
    }
    return (
      <span>
        Showing evolution from <span className='highlight'>{start}</span> to
        now.
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
          <div className='hint'>{this.getPeriod(period)}</div>
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
