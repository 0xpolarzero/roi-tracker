import React from 'react';

import Profile from './Profile';
import EthPrice from './EthPrice';

class Header extends React.Component {
  constructor() {
    super();
  }
  // A comprehensive ROI tracker across your wallets.

  getConnectButton = () => {
    if (this.props.isLogged) {
      return (
        <button className='connect-web3'>{this.props.addressFromWallet}</button>
      );
    } else {
      return (
        <button className='connect-web3'>
          <i className='fa-brands fa-ethereum connect-eth'></i> Connect
        </button>
      );
    }
  };

  render() {
    return (
      <header className='header'>
        <div className='nav'>
          <div className='app-title'>
            <span className='alt-char'>0x</span>
            <span className='main-char'>Tracer</span>
          </div>
          <EthPrice ethPriceValue={this.props.ethPriceValue} />
          <Profile />
        </div>
      </header>
    );
  }
}

export default Header;
