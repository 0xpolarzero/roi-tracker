import React from 'react';
import AddressesList from './AddressesList';
import { displayNotif } from '../../systems/utils';
import { isValidAddress } from '../../systems/transactions';

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      period: [],
    };
  }

  // MANAGING ADDRESSES

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
      <div className='tracker'>
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
          <AddressesList
            addresses={this.state.addresses}
            removeAddress={this.removeAddress}
          />
        </div>
        <div className='period-config'>
          <i className='addresses-icon fa-solid fa-hourglass'></i>
          <form onSubmit={this.trackROI}>
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
      </div>
    );
  }
}

export default Tracker;

// Main tracker with Track button
// On click get adresses and period from other components
