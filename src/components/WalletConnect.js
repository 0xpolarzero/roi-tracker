import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { displayNotif } from '../utils/utils';

class WalletConnect extends React.Component {
  constructor() {
    super();
  }

  closeWalletConnect = () => {
    //
  };

  submitWalletConnect = async () => {
    const provider = await detectEthereumProvider();

    if (!provider) {
      displayNotif('error', 'Please install MetaMask to connect', 5000);
      console.log(
        'Sorry, we only support MetaMask for now. You should install the extension if you want to connect.',
      );
    }

    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    const address = accounts[0];
  };

  render() {
    return (
      <div className='popup-wrapper'>
        <div className='wallet-connect-popup'>
          <div className='content'>
            <div className='title'>Connect your Wallet</div>
            <div className='context'>
              <p>
                This will let you sign an authorization{' '}
                <span className='highlight'>to read your wallet</span>, so we
                can see your address & NFTs.
              </p>
              <p>
                This will allow you to{' '}
                <span className='highlight'>save different configurations</span>{' '}
                (addresses, tracked tokens) &{' '}
                <span className='highlight'>import tokens</span> directly from
                your wallet
              </p>
              <p>▼</p>
            </div>
            <div className='connect-metamask'>
              <button
                className='connect-metamask-btn'
                onClick={this.submitWalletConnect}
              >
                <img
                  src='./Metamask-logo.png'
                  width={300}
                  alt='Metamask logo'
                />
              </button>
            </div>
            <button
              className='close-popup-btn'
              onClick={this.props.closeWalletConnect}
            >
              𐄂
            </button>
          </div>
        </div>
        <div id='blur-container' onClick={this.props.closeWalletConnect}></div>
      </div>
    );
  }
}

export default WalletConnect;
