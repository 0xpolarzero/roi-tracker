import React from 'react';
import './styles/index.css';
import Header from './components/Header';
import Tracker from './components/Tracker/Tracker';

class App extends React.Component {
  constructor() {
    super();
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
