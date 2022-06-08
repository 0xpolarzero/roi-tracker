import React from 'react';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { getTransactions, isValidAddress } from '../systems/transactions';
import { displayNotif } from '../systems/utils';

class AddressConfig extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
    };
  }

  handleChange = (e) => {
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
    this.setState(
      {
        // Prevent user from adding duplicate addresses
        addresses: new Set([...this.state.addresses, this.state.address]),
        address: '',
      },
      this.displayAddresses,
    );
    displayNotif('info', 'Address added!', 2000);
  };

  removeAddress = (e) => {
    this.setState(
      {
        addresses: this.state.addresses.filter(
          (address) => e.target.id !== address,
        ),
      },
      this.displayAddresses,
    );
  };

  displayAddresses = () => {
    console.log(this.state.addresses);
  };

  componentDidMount() {
    this.setState(
      {
        // Prevent user from adding duplicate addresses
        addresses: [
          '0x0000000000000000000000000000000000000000',
          '0x66C53B84CBC4ECC6A89F53171FEA0013c8C48f12',
        ],
        address: '',
      },
      this.displayAddresses,
    );
  }

  render() {
    return (
      <div className='addresses-config'>
        <i className='addresses-icon fa-solid fa-wallet'></i>
        <input
          value={this.state.address}
          onChange={this.handleChange}
          type='text'
          id='add-address'
          placeholder='Add an address'
        />
        <button onClick={this.addAddress}>Add</button>
        <div className='addresses-list'>
          <div className='title'>Wallet ({this.state.addresses.length})</div>
          <ul>
            {this.state.addresses.map((address) => {
              return (
                <li key={address}>
                  {address}{' '}
                  <button
                    onClick={this.removeAddress}
                    id={address}
                    className='fa-solid fa-trash-can'
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class PeriodConfig extends React.Component {
  constructor() {
    super();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='period-config'>
        <i className='addresses-icon fa-solid fa-hourglass'></i>
        <form onSubmit={this.handleSubmit}>
          <div className='title'>Time period</div>
          <div className='period'>
            <div className='period-custom'>
              <span>From</span>
              <input type='datetime-local' id='date-from' />
              <span>To</span>
              <input type='datetime-local' id='date-to' />
            </div>
            <span>or</span>
            <div className='period-fixed'>
              <button className='period-hour'>Last hour</button>
              <button className='period-day'>Today</button>
            </div>
          </div>
          <button type='submit'>Track</button>
        </form>
      </div>
    );
  }
}

class Result extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div className='tracker-result'></div>;
  }
}

class Tracker extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='tracker'>
        <AddressConfig />
        <PeriodConfig />
        <Result />
      </div>
    );
  }
}

export default Tracker;
