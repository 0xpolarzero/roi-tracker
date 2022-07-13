import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Table from './EvolutionTable/Table';
import ExchangesData from './Exchanges';
import ProgressBar from '../Utils/ProgressBar';
import { TimestampConverter } from '../../systems/timestamp';

class ResultData extends React.Component {
  constructor() {
    super();
  }

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

    // if (loading) {
    //   document.querySelector('.result-content') &&
    //     document.querySelector('.result-content').classList.add('loading');
    //   return (
    //     <div className='result-content'>
    //       <ProgressBar loadingProgress={loadingProgress} />
    //     </div>
    //   );
    // }

    if (period.from === '' || period.to === '') {
      document.querySelector('.result-content') &&
        document.querySelector('.result-content').classList.remove('loading');
      return (
        <div className='result-content'>
          <div className='header'>
            <div className='title'>How to run the app?</div>
          </div>
          <div className='message'>
            <i className='config-icon-min fa-solid fa-wallet'></i>
            <div>
              <span className='highlight'>
                Include your hot & burner wallets
              </span>{' '}
              to have a proper understanding of your evolution.
            </div>

            <i className='config-icon-min fa-solid fa-coins'></i>
            <div>
              Choose{' '}
              <span className='highlight'>
                tokens from your connected wallet
              </span>{' '}
              to track them (default ETH & wETH).
            </div>

            <i className='config-icon-min fa-solid fa-hourglass'></i>
            <div>
              Select a custom or predefined{' '}
              <span className='highlight'>time period</span> to see the
              evolution of your assets.
            </div>

            <span className='separator-hor'></span>

            <i className='config-icon-min fa-solid fa-cogs'></i>
            <div> Save and load presets (addresses & tokens to track)</div>
          </div>
        </div>
      );
    }

    document.querySelector('.result-content') &&
      document.querySelector('.result-content').classList.remove('loading');
    return (
      <div className='result-content'>
        <Table
          balance={balance}
          totalDepositValue={this.setDeposits(deposits)}
          date={period}
          ethPriceValue={ethPriceValue}
          loading={loading}
        />
        {/* <ExchangesData
            deposits={deposits}
            totalDepositValue={this.setDeposits('ETH')}
          /> */}
      </div>
    );
  }
}

class ResultHeader extends React.Component {
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
        Showing data from <span className='data-dates'>{start}</span> to{' '}
        <span className='data-dates'>{end}</span>.
      </span>
    );
  };

  render() {
    return (
      <div className='card result-header hint'>
        {this.displayPeriod(this.props.period)}
      </div>
    );
  }
}

export { ResultHeader, ResultData };
