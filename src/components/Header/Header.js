import { useEffect } from 'react';

import Profile from './Profile';
import EthPrice from './EthPrice';

const Header = ({ ethPriceValue }) => {
  // A comprehensive ROI tracker across your wallets.

  return (
    <header className='header'>
      <div className='nav'>
        <div className='app-title'>
          <span className='alt-char'>0x</span>
          <span className='main-char'>Tracer</span>
        </div>
        <EthPrice ethPriceValue={ethPriceValue} />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
