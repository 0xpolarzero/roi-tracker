import React from 'react';

class TokensConfig extends React.Component {
  constructor() {
    super();
  }

  toggleChange = () => {
    this.setState({});
  };

  render() {
    return (
      <div className='token-config'>
        <div className='header'>
          <div className='title'>Tokens</div>
          <input
            type='text'
            name='add-token-manual'
            id='add-token-manual'
            placeholder='Add a token from address'
          />
          <button className='add-token-manual-btn'>Add</button>
          <button className='add-token-from-wallet-btn'>
            Import from wallet ↓
          </button>
        </div>
        <div className='wrapper'>
          <div className='token-list'>
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
            <div className='token-item'>token</div>
            <div className='token-item'>token</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokensConfig;
