import React from 'react';
import AddressesConfig from './AddressesConfig';
import PeriodConfig from './PeriodConfig';
import Result from './Result';

import { displayNotif } from '../../systems/utils';
import { getTransactions, isValidAddress } from '../../systems/transactions';
import { TimestampConverter } from '../../systems/timestamp';

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      transactions: {},
      period: { from: '', to: '' },
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

  trackROI = async (e) => {
    let startDate;

    // Check at least one address
    if (this.state.addresses.length === 0) {
      displayNotif('error', 'No address selected', 2000);
      return;
    }
    if (e === 'lastHour') {
      // Get the period from last hour to current time
      startDate = TimestampConverter().lastHour();
    } else if (e === 'today') {
      // Get the period from midnight to current time
      startDate = TimestampConverter().today();
    } else if (e === 'lastWeek') {
      // Get the period from last week to current time
      startDate = TimestampConverter().lastWeek();
    }
    const transactions = await getTransactions(startDate, this.state.addresses);
    this.setState({
      period: { from: startDate, to: 'now' },
      transactions: transactions,
    });
  };

  componentDidMount() {
    this.setState({
      // Prevent user from adding duplicate addresses
      addresses: [
        '0xcbFFa910Ee7546AF659B82E4E7ed54cF8524Aab6',
        '0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12',
      ],
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
          <PeriodConfig trackROI={this.trackROI} changeDate={this.changeDate} />
        </div>
        <Result
          period={this.state.period}
          transactions={this.state.transactions}
        />
      </div>
    );
  }
}

export default Tracker;
