import React from 'react';
import { TimestampConverter } from '../../systems/timestamp';

class Result extends React.Component {
  constructor() {
    super();
  }

  getTransactionsCount = (transactions) => {
    let count = 0;
    for (const key in transactions) {
      count += transactions[key].length;
    }
    return count;
  };

  getPeriod = (time) => {
    const start = TimestampConverter().timestampToDate(time).toLocaleString();
    if (start === 'Invalid Date') {
      return '. No period selected.';
    }
    return (
      <span>
        , from <span className='highlight'>{start}</span>
      </span>
    );
  };

  listTransactions = (transactions) => {
    const list = [];
    for (const key in transactions) {
      for (const transaction of transactions[key]) {
        list.push(
          <div className='transaction' key={transaction.hash}>
            <div className='hash'>{transaction.hash}</div>
            <div className='timestamp'>
              {TimestampConverter()
                .timestampToDate(transaction.timestamp)
                .toLocaleString()}
            </div>
            <div className='value'>{transaction.value}</div>
          </div>,
        );
      }
    }
    return list;
  };

  render() {
    const { period, transactions, loading } = this.props;

    if (loading) {
      return (
        <div className='result'>
          <div className='loading'>Loading...</div>
        </div>
      );
    } else {
      return (
        <div className='result'>
          <div className='hint'>
            Showing data for{' '}
            <span className='highlight'>
              {this.getTransactionsCount(transactions)}
            </span>{' '}
            transactions{this.getPeriod(period.from)}
          </div>
          <div className='transactions'>
            {this.listTransactions(transactions)}
          </div>
        </div>
      );
    }
  }
}

export default Result;
