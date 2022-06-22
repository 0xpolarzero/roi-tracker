import { useEffect } from 'react';
import { useState } from 'react';
import { useAccount, useConnect, useEnsName, useEnsAvatar } from 'wagmi';

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const displayAccount = (account, ensAvatar, ensName) => {
    return (
      <div className='wallet-connect'>
        <img src={ensAvatar} alt='ENS Avatar' />
        <div>
          {ensName ? `${ensName} (${account.address})` : account.address}
        </div>
        <div>Connected to {account.address}</div>
      </div>
    );
  };
  // If wallet is not connected but user clicked on connect wallet button
  if (isPopupOpen) {
    return (
      <WalletPopup
        setIsPopupOpen={setIsPopupOpen}
        displayAccount={displayAccount}
      />
    );
  }

  // If user did not interact with the wallet yet
  return (
    <div className='wallet-connect'>
      <button onClick={() => setIsPopupOpen(true)}>
        <i className='fa-brands fa-ethereum connect-eth'></i> Connect wallet
      </button>
    </div>
  );
};

const WalletPopup = ({ setIsPopupOpen, displayAccount }) => {
  const { data: account } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address });
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect, connectors, isConnecting, pendingConnector, error } =
    useConnect();

  if (account) {
    return displayAccount(account, ensAvatar, ensName);
  }

  return (
    <div className='popup-wrapper'>
      <div className='wallet-connect-popup'>
        <div className='title'>Select your wallet</div>
        <div className='content'>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isConnecting &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
        <button
          className='close-popup-btn'
          onClick={() => setIsPopupOpen(false)}
        >
          𐄂
        </button>
      </div>
      <div id='blur-container' onClick={() => setIsPopupOpen(false)}></div>
    </div>
  );
};

export default Profile;
