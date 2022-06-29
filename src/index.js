import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './RouteSwitch';

import { MoralisProvider } from 'react-moralis';

import '@fortawesome/fontawesome-free/css/all.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER}
      appId={process.env.REACT_APP_MORALIS_ID}
    >
      <RouteSwitch />
    </MoralisProvider>
  </React.StrictMode>,
);
