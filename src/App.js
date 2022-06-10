import React from 'react';
import './styles/index.css';
import Header from './components/Header/Header';
import Tracker from './components/Tracker/Tracker';
import { displayNotif } from './systems/utils';

class App extends React.Component {
  constructor() {
    super();
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
        <Header />
        <Tracker />
        <div className='notif'></div>
      </div>
    );
  }
}

export default App;
