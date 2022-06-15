import React from 'react';
import AddressesConfig from './AddressesConfig';
import PeriodConfig from './PeriodConfig';
import TransfersConfig from './TransfersConfig';
import Result from './Result';

import { displayNotif } from '../../utils/utils';
import { getBalanceDiff, isValidAddress } from '../../systems/transactions';
import { TimestampConverter } from '../../systems/timestamp';

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      balance: {},
      period: { from: '', to: '' },
      loading: false,
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
    if (!isValidAddress(this.state.address)) {
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

  ignoreTransfers = (e) => {
    this.setState({
      isTransfersIgnored: !this.state.isTransfersIgnored,
    });
  };

  trackROI = async (input, from, to) => {
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

    // Update Result component to show loading
    this.setState({
      loading: true,
    });

    const balance = await getBalanceDiff(
      startDate,
      endDate,
      this.state.addresses,
    ).catch((err) => {
      console.log(err);
      displayNotif('error', err.message, 2000);
    });

    this.setState({
      period: { from: startDate, to: endDate },
      balance: balance,
    });

    // Tell Result component it's done loading
    this.setState({
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
          <AddressesConfig
            address={this.state.address}
            addresses={this.state.addresses}
            changeAddress={this.changeAddress}
            addAddress={this.addAddress}
            removeAddress={this.removeAddress}
          />
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
          loading={this.state.loading}
          ethPriceValue={this.props.ethPriceValue}
        />
      </div>
    );
  }
}

export default Tracker;
