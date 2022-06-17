import React from 'react';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import EthDater from 'ethereum-block-by-date';

import AddressesConfig from './AddressesConfig';
import PeriodConfig from './PeriodConfig';
import TransfersConfig from './TransfersConfig';
import TokensConfig from './TokensConfig';
import Result from './Result';

import { displayNotif } from '../../utils/utils';
import {
  getEthBalance,
  getTokenBalance,
  getTokenAddress,
  isValidAddress,
} from '../../systems/balance';
import { getDeposits } from '../../systems/exchanges/exchanges';
import { TimestampConverter } from '../../systems/timestamp';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);
const dater = new EthDater(web3);

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      tokensToTrack: [],
      balance: {
        eth: {
          start: 0,
          end: 0,
        },
        weth: {
          start: 0,
          end: 0,
        },
      },
      deposits: [],
      period: { from: '', to: '' },
      loading: false,
      loadingProgress: 0,
      isTransfersIgnored: true,
    };
  }

  // MANAGING ADDRESSES

  changeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  addAddress = (e) => {
    // Check if address is valid with Web3.js
    if (!isValidAddress(web3, this.state.address)) {
      displayNotif('error', 'Invalid address', 2000);
      return;
    }
    this.setState({
      // Prevent user from adding duplicate addresses
      addresses: Array.from(
        new Set([...this.state.addresses, this.state.address]),
      ),
      address: '',
    });
    displayNotif('info', 'Address added!', 2000);
  };

  removeAddress = (e) => {
    this.setState({
      addresses: this.state.addresses.filter(
        (address) => e.target.id !== address,
      ),
    });
  };

  updateTokens = (token, status) => {
    if (status) {
      this.setState({
        tokens: [...this.state.tokens, token],
      });
    } else {
      this.setState({
        tokens: this.state.tokens.filter((t) => t.address !== token.address),
      });
    }
  };

  ignoreTransfers = (e) => {
    this.setState({
      isTransfersIgnored: !this.state.isTransfersIgnored,
    });
  };

  getPeriod = (input, from, to) => {
    let startDate;
    let endDate;

    // Check at least one address
    if (this.state.addresses.length === 0) {
      displayNotif('error', 'No address selected', 2000);
      return;
    }

    if (input === 'custom') {
      // Check if the user filled both date fields
      if (from === '' || to === '') {
        displayNotif('error', 'Please fill both date fields', 2000);
        return;
      }
      // Check if the user has selected a valid date
      if (!from || !to) {
        displayNotif('error', 'Invalid date', 2000);
        return;
      }
      // Check if the user choose a valid period
      if (from > to) {
        displayNotif(
          'error',
          'Invalid period. Please select a start date that occurs before the end date.',
          2000,
        );
        return;
      }
      // Don't let the user select an end date in the future
      if (
        TimestampConverter().dateToTimestamp(to) > TimestampConverter().now() ||
        TimestampConverter().dateToTimestamp(from) > TimestampConverter().now()
      ) {
        displayNotif(
          'error',
          'Invalid date. I can\t yet predict the future...',
          2000,
        );
        return;
      }

      startDate = from;
      endDate = to;
    } else {
      if (input === 'lastHour') {
        // Get the period from last hour to current time
        startDate = TimestampConverter().lastHour();
      } else if (input === 'today') {
        // Get the period from midnight to current time
        startDate = TimestampConverter().today();
      } else if (input === 'lastWeek') {
        // Get the period from last week to current time
        startDate = TimestampConverter().lastWeek();
      }
      endDate = TimestampConverter().now();
    }

    return { startDate, endDate };
  };

  updateProgress = (progress) => {
    this.setState({
      loadingProgress: progress,
    });
    console.log('Loading...', progress);
  };

  trackROI = async (input, from, to) => {
    let balanceETH = {};
    let balanceWETH = {};

    const { startDate, endDate } = this.getPeriod(input, from, to);

    // Update Result component to show loading and initiate progress bar
    this.setState({
      loading: true,
      loadingProgress: 0,
    });

    // Get the closest block corresponding to the dates
    const startBlock = await dater.getDate(startDate);
    const endBlock =
      to === TimestampConverter().now()
        ? { block: 'latest' }
        : await dater.getDate(endDate);

    this.updateProgress(10);

    // Get the balance in ETH at both start and end date
    balanceETH.start = await getEthBalance(
      web3,
      startBlock.block,
      this.state.addresses,
    ).catch((err) => {
      console.log(err);
      displayNotif('error', err.message, 2000);
    });

    this.updateProgress(20);

    balanceETH.end = await getEthBalance(
      web3,
      endBlock.block,
      this.state.addresses,
    ).catch((err) => {
      console.log(err);
      displayNotif('error', err.message, 2000);
    });

    this.updateProgress(30);

    // Get the balance in WETH at both start and end date
    balanceWETH.start = await getTokenBalance(
      web3,
      startBlock.block,
      this.state.addresses,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    );

    this.updateProgress(40);

    balanceWETH.end = await getTokenBalance(
      web3,
      endBlock.block,
      this.state.addresses,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    );

    this.setState({
      period: { from: startDate, to: endDate },
      balance: { eth: balanceETH, weth: balanceWETH },
    });

    this.updateProgress(50);

    // Get the balance for other tokens
    const testToken = getTokenAddress(web3, 'WETH');
    console.log(testToken);

    // Get the amount deposited from exchange plateforms during this period
    const deposits = this.state.isTransfersIgnored
      ? await getDeposits(web3, this.state.addresses, {
          start: startBlock.block,
          end: endBlock.block,
        })
      : 0;

    this.updateProgress(100);

    // Update deposits & tell Result component it's done loading
    this.setState({
      deposits: deposits,
      loading: false,
    });
  };

  componentDidMount() {
    this.setState({
      // Prevent user from adding duplicate addresses
      addresses: ['0x02c2adbdB7c0C1037B5278626A78B6c71787dFe8'],
      address: '',
    });
  }

  render() {
    return (
      <div className='tracker'>
        <div className='config'>
          <div className='wrap-configs'>
            <AddressesConfig
              address={this.state.address}
              addresses={this.state.addresses}
              changeAddress={this.changeAddress}
              addAddress={this.addAddress}
              removeAddress={this.removeAddress}
            />
            <TokensConfig updateTokens={this.updateTokens} />
          </div>
          <div className='wrap-configs'>
            <PeriodConfig
              trackROI={this.trackROI}
              changeDate={this.changeDate}
            />
            <TransfersConfig
              ignoreTransfers={this.ignoreTransfers}
              isTransfersIgnored={this.state.isTransfersIgnored}
            />
          </div>
        </div>
        <Result
          period={this.state.period}
          balance={this.state.balance}
          deposits={this.state.deposits}
          loading={this.state.loading}
          loadingProgress={this.state.loadingProgress}
          ethPriceValue={this.props.ethPriceValue}
        />
      </div>
    );
  }
}

export default Tracker;
