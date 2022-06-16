import React from 'react';
import EvolutionTable from './EvolutionTable';
import ExchangesData from './ExchangesData';
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

  setDeposits = (asset) => {
    if (this.props.deposits.length === 0 || this.props.deposits === 0) {
      return 0;
    }

    // Find each deposit corresponding to this asset
    const depositsOfAsset = this.props.deposits.filter((deposit) => {
      return deposit.asset === asset;
    });
    if (depositsOfAsset.length === 0) {
      return 0;
    }

    const totalDeposit = this.sumDeposits(depositsOfAsset);

    return totalDeposit;
  };

  sumDeposits = (deposits) => {
    let total = 0;
    for (const deposit of deposits) {
      total += deposit.value;
    }
    return total;
  };

  render() {
    const {
      period,
      balance,
      deposits,
      loading,
      loadingProgress,
      ethPriceValue,
    } = this.props;

    if (loading) {
      return (
        <div className='result'>
          <div className='loading'>Loading... {loadingProgress}</div>
        </div>
      );
    } else {
      return (
        <div className='result'>
          <div className='hint'>{this.displayPeriod(period)}</div>
          <EvolutionTable
            balance={balance}
            totalDepositValue={this.setDeposits(deposits)}
            date={period}
            ethPriceValue={ethPriceValue}
          />
          <ExchangesData
            deposits={deposits}
            totalDepositValue={this.setDeposits('ETH')}
          />
        </div>
      );
    }
  }
}

export default Result;
