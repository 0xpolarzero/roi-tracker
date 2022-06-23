import React from 'react';

import EthDater from 'ethereum-block-by-date';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { WagmiConfig, createClient } from 'wagmi';

import './styles/index.css';
import Tracker from './components/Tracker';

import { setupClient } from './systems/wagmi-client-setup';
import { displayNotif } from './utils/utils';
import { fetchData } from './utils/utils';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

const dater = new EthDater(web3);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      addressFromWallet: '',
      tokensFromWallet: [],
      ethPriceValue: 0,
    };
  }

  getWalletInfos = async () => {
    //
  };

  getEthPrice = async () => {
    const data = await fetchData(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    );

    this.setState({
      ethPriceValue: data.ethereum.usd,
    });
  };

  componentDidMount() {
    this.getEthPrice();
    this.ethPriceInterval = setInterval(() => {
      this.getEthPrice();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.ethPriceInterval);
  }

  // In case any error was missed in child components
  componentDidCatch(error, info) {
    console.log(error, info);
    displayNotif(
      'Error',
      'An error has occurred. Please check the console or reload the page.',
      4000,
    );
  }

  // Gérer la connextion dans Header
  // Dès qu'elle est faite lancer connectWallet() avec l'address et les tokens dans le state + isLogged
  // Envoyer ça dans Tracker
  // Ajouter ces éléments dans la prise en compte (par exemple if (isLogged) { addAddress(addressFromWallet) } })

  render() {
    return (
      <WagmiConfig client={setupClient()}>
        <div className='App'>
          <Tracker
            web3={web3}
            dater={dater}
            ethPriceValue={this.state.ethPriceValue}
          />
          <div className='notif'></div>
          <div className='bg-blur'></div>
        </div>
      </WagmiConfig>
    );
  }
}

export default App;
