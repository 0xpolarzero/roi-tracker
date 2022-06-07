import React from 'react';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { getTransactions, isValidAddress } from '../systems/transactions';
import { displayNotif } from '../systems/utils';

class Addresses extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='addressInput'>Add address</label>
          <input
            value={this.state.address}
            onChange={this.handleChange}
            type='text'
            id='add-address'
          />
          <button onClick={this.addAddress}>Add</button>
        </form>
        <div className='addresses-list'>
          <div className='title'>Wallet ({this.state.addresses.length})</div>
          <ul>
            {this.state.addresses.map((address) => {
              return (
                <li key={address}>
                  {address}{' '}
                  <span onClick={this.removeAddress} id={address}>
                    Remove
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class Tracker extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='tracker'>
        <Addresses />
      </div>
    );
  }
}

export default Tracker;
