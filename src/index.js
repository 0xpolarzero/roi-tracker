import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { WagmiConfig } from 'wagmi';
import { setupClient } from './systems/wagmi-client-setup';

import '@fortawesome/fontawesome-free/css/all.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={setupClient()}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
);
