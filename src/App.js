import React, { useEffect, useState } from 'react';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { useMoralis } from 'react-moralis';
import EthDater from 'ethereum-block-by-date';

import Tracker from './components/Tracker';
import Connect from './components/Connect';

import { displayNotif, fetchData } from './systems/utils';

import './styles/index.css';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

const dater = new EthDater(web3);

const App = () => {
  const [ethPriceValue, setEthPriceValue] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  const { isWeb3Enabled } = useMoralis();

  // Display ETH Price
  useEffect(() => {
    let interval;
    const setEthPrice = async () => {
      interval = setInterval(async () => {
        const ethPrice = await getEthPrice();
        setEthPriceValue(ethPrice);
      }, 10000);
      const ethPrice = await getEthPrice();
      setEthPriceValue(ethPrice);
    };
    setEthPrice();

    return () => clearInterval(interval);
  }, []);

  const getEthPrice = async () => {
    const ethPrice = await fetchData(
      'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
    ).catch((err) => {
      console.log(err);
      displayNotif('error', 'Failed to fetch Ether price.', 2000);
      return 'Unknown';
    });

    return Number(ethPrice.data.rates.USD).toFixed(2);
  };

  useEffect(() => {
    window.ethereum.on('accountsChanged', updateWalletStatus);
    updateWalletStatus();
  }, []);

  const updateWalletStatus = async () => {
    const accounts = await web3.eth.getAccounts();
    setIsLogged(accounts.length > 0);
  };

  // Gérer la connextion dans Header
  // Dès qu'elle est faite lancer connectWallet() avec l'address et les tokens dans le state + isLogged
  // Envoyer ça dans Tracker
  // Ajouter ces éléments dans la prise en compte (par exemple if (isLogged) { addAddress(addressFromWallet) } })

  return (
    <div className='App'>
      <Tracker
        web3={web3}
        dater={dater}
        ethPriceValue={ethPriceValue}
        isLogged={isLogged}
      />
      <div className='notif'></div>
      <div className='bg-blur'></div>
    </div>
  );
};

export default App;
