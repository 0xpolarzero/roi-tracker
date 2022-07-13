import React from 'react';
import ReactDOM from 'react-dom/client';

import { MoralisProvider } from 'react-moralis';
import RouteSwitch from './RouteSwitch';
import { SkeletonTheme } from 'react-loading-skeleton';

import '@fortawesome/fontawesome-free/css/all.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER}
      appId={process.env.REACT_APP_MORALIS_ID}
    >
      <SkeletonTheme
        baseColor='rgba(20, 20, 20, 0.3)'
        highlightColor='rgba(20, 20, 20, 0.5)'
      >
        <RouteSwitch />
      </SkeletonTheme>
    </MoralisProvider>
  </React.StrictMode>,
);
