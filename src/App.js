import React from 'react';
import './styles/index.css';
import Header from './components/Header/Header';
import Tracker from './components/Tracker/Tracker';
import WalletConnect from './components/WalletConnect';
import { displayNotif } from './utils/utils';
import { fetchData } from './utils/utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isPopupOpen: false,
      isLogged: false,
      addressFromWallet: '',
      tokensFromWallet: [],
      ethPriceValue: 0,
    };
  }

  openWalletConnect = () => {
    this.setState({
      isPopupOpen: true,
    });
  };

  closeWalletConnect = () => {
    this.setState({
      isPopupOpen: false,
    });
  };

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
      <div className='App'>
        <Header
          openWalletConnect={this.openWalletConnect}
          submitWalletConnect={this.submitWalletConnect}
          isLogged={this.state.isLogged}
          addressFromWallet={this.state.addressFromWallet}
          ethPriceValue={this.state.ethPriceValue}
        />
        <Tracker ethPriceValue={this.state.ethPriceValue} />
        <div className='notif'></div>
        <div className='popup'>
          {this.state.isPopupOpen && (
            <WalletConnect
              getWalletInfos={this.getWalletInfos}
              closeWalletConnect={this.closeWalletConnect}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
