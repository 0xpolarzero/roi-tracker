import React from 'react';
import AddressesConfig from './AddressesConfig';
import PeriodConfig from './PeriodConfig';
import { displayNotif } from '../../systems/utils';
import { getTransactions, isValidAddress } from '../../systems/transactions';
import { TimestampConverter, isValidDate } from '../../systems/timestamp';

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
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

  changeDate = (e) => {
    if (e.target.id === 'date-from') {
      this.setState({
        period: {
          from: e.target.value,
          to: this.state.period.to,
        },
      });
    } else {
      this.setState({
        period: {
          from: this.state.period.from,
          to: e.target.value,
        },
      });
    }
  };

  trackROI = async (e) => {
    let transactions;

    // Check at least one address
    if (this.state.addresses.length === 0) {
      displayNotif('error', 'No address selected', 2000);
      return;
    }
    if (e === 'lastHour') {
      // Get the period from last hour to current time
      const lastHour = TimestampConverter().lastHour();
      const now = TimestampConverter().now();
      transactions = await getTransactions(lastHour, now);
    } else if (e === 'today') {
      // Get the period from midnight to current time
      const midnight = TimestampConverter().today();
      const now = TimestampConverter().now();
      transactions = await getTransactions(midnight, now);
    } else {
      e.preventDefault();
      // Otherwise the time period is custom
      // Check the validity of the time period
      if (
        !isValidDate(this.state.period.from) ||
        !isValidDate(this.state.period.to)
      ) {
        displayNotif('error', 'Please make sure to fill the two dates', 2000);
        return;
      }
      // Then proceed to the timestamp of those dates
      const start = TimestampConverter().dateToTimestamp(
        this.state.period.from,
      );
      const end = TimestampConverter().dateToTimestamp(this.state.period.to);
      transactions = await getTransactions(start, end);
    }

    // console.log(transactions);
  };

  componentDidMount() {
    this.setState({
      // Prevent user from adding duplicate addresses
      addresses: [
        '0x0000000000000000000000000000000000000000',
        '0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12',
      ],
      address: '',
    });
  }

  render() {
    return (
      <div className='tracker'>
        <AddressesConfig
          address={this.state.address}
          addresses={this.state.addresses}
          changeAddress={this.changeAddress}
          addAddress={this.addAddress}
          removeAddress={this.removeAddress}
        />
        <PeriodConfig trackROI={this.trackROI} changeDate={this.changeDate} />
      </div>
    );
  }
}

export default Tracker;
