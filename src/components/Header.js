import React from 'react';

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
            <span className='main'>ROI</span>
            <span>Tracer</span>
          </div>
          <button className='connect-web3'>Connect</button>
        </div>
      </header>
    );
  }
}

export default Header;
