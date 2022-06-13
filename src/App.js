import React from 'react';
import './styles/index.css';
import Header from './components/Header/Header';
import Tracker from './components/Tracker/Tracker';
import { displayNotif } from './systems/utils';
import { fetchData } from './systems/utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ethPriceValue: 0,
    };
  }

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
    }, 10000);
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

  render() {
    return (
      <div className='App'>
        <Header ethPriceValue={this.state.ethPriceValue} />
        <Tracker ethPriceValue={this.state.ethPriceValue} />
        <div className='notif'></div>
      </div>
    );
  }
}

export default App;
