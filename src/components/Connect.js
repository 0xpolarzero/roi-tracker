import { useMoralis } from 'react-moralis';

import { displayNotif } from '../systems/utils';
import metamaskIcon from './icons/metamask-icon.png';
import walletConnectIcon from './icons/walletconnect-icon.svg';
import { useEffect } from 'react';

const Connect = ({ isLogged }) => {
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
  } = useMoralis();

  const loginWithMoralis = async (connectorId) => {
    if (!isAuthenticated) {
      await authenticate({
        provider: connectorId,
        signingMessage:
          "Login with Moralis. This will allow you to save your tracking configurations. We won't be able to perform any transaction without your explicit approval, nor to see your private keys.",
      })
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          displayNotif('error', err, 4000);
          console.error(err);
        });
    }
    if (!isLogged) {
      const connectorId = window.localStorage.getItem('connectorId');
      // setIsLogged(false);
      enableWeb3({ provider: connectorId });
    }
  };

  return (
    <div className='connect-wallet'>
      <div className='wrapper'>
        <div className='header'>
          {isLogged ? 'Sign in with' : 'Connect'} your wallet to launch the app
        </div>
        <div className='connectors'>
          {connectors.map(({ name, icon, connectorId }, key) => (
            <button
              className={'connector' + ' ' + connectorId}
              key={key}
              onClick={() => {
                connectorId === 'injected' && loginWithMoralis(connectorId);
                connectorId === 'walletconnect' &&
                  displayNotif(
                    'error',
                    'Not implemented yet. Please use a MetaMask wallet instead.',
                    3000,
                  );
              }}
              // disabled={connectorId === 'walletconnect'}
            >
              <img src={icon} alt={name} height={16} />
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connect;

const connectors = [
  {
    name: 'Metamask',
    icon: metamaskIcon,
    connectorId: 'injected',
    priority: 1,
  },
  {
    name: 'WalletConnect',
    icon: walletConnectIcon,
    connectorId: 'walletconnect',
    priority: 2,
  },
];
