import React from 'react';

import Popup from '../Utils/Popup';

class TokensConfig extends React.Component {
  constructor() {
    super();
  }

  toggleChange = () => {
    this.setState({});
  };

  showInfo() {
    Popup.display(
      [
        `You can include tokens you held in one of your wallets during the last 30 days.`,
      ],
      '.fa-circle-info',
    );
  }

  hideInfo() {
    Popup.hide('#popup');
  }

  render() {
    return (
      <div className='card token-config config-item'>
        <div className='header'>
          <div className='title'>
            <i className='config-icon fa-solid fa-coins'></i>Tokens
            <i
              className='token-info fa-solid fa-circle-info'
              onMouseEnter={this.showInfo}
              onMouseLeave={this.hideInfo}
            ></i>
          </div>
          <div className='buttons'>
            <button className='select-tokens-all-btn'>All</button>
            <button className='select-tokens-min-btn'>Minimum</button>
          </div>
        </div>
        <input
          type='text'
          name='add-token-manual'
          id='add-token-manual'
          placeholder='Search a token in your wallet'
        />
        <div className='wrapper'>
          <div className='token-list'>
            <div className='token-item'>
              'Connect wallet to see your tokens'
            </div>
            <div className='token-item'>+ scoll if more than n</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokensConfig;
