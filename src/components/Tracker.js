import React from 'react';
import { getTransactions } from '../systems/transactions';

class Tracker extends React.Component {
  constructor() {
    super();

    this.state = {
      address: '',
      addresses: [],
      transactions: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  addAddress = (e) => {
    e.preventDefault();
    this.setState({
      addresses: new Set(this.state.addresses.concat(this.state.address)),
      address: '',
    });
  };

  componentDidMount() {
    getTransactions();
  }

  render() {
    return (
      <div className='tracker'>
        <form action=''></form>
        <div className='address-input'>
          <input type='text' name='address' id='address' />
          <button onClick={this.getTransactions}>Test</button>
        </div>
      </div>
    );
  }
}

export default Tracker;
