import React from 'react';
import EthPrice from './EthPrice';

class Header extends React.Component {
  constructor() {
    super();
  }

  // A comprehensive ROI tracker across your wallets.

  render() {
    return (
      <header className='header'>
        <div className='nav'>
          <div className='app-title'>
            <span className='main-char'>d</span>
            <span className='alt-char'>aily</span>{' '}
            <span className='main-char'>/</span>{' '}
            <span className='main-char'>w</span>
            <span className='alt-char'>eekly</span>{' '}
            <span className='main-char'>ROI</span>
          </div>
          <EthPrice ethPriceValue={this.props.ethPriceValue} />
          <button className='connect-web3'>
            <i className='fa-brands fa-ethereum connect-eth'></i> Connect
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
