import Profile from './Profile/Profile';
import EthPrice from './EthPrice';

const Header = ({ web3, ethPriceValue }) => {
  // A comprehensive ROI tracker across your wallets.

  return (
    <header className='header'>
      <div className='nav'>
        <div className='app-title'>
          <span className='content'>
            <span className='alt-char'>p</span>
            <i className='fa-solid fa-asterisk'></i>
            <span className='alt-char'>lar</span>
            <span className='main-char'>eth</span>
          </span>
        </div>
        <EthPrice ethPriceValue={ethPriceValue} />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
