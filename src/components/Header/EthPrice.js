import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/utils';

let resetLastUpdated;

const EthPrice = ({ ethPriceValue }) => {
  useEffect(() => {
    resetLastUpdated();
  });

  return (
    <div className='eth-price'>
      <i className='eth-price-label fa-brands fa-ethereum'></i>
      <span className='eth-price-value'>${ethPriceValue}</span>
      <EthPriceUpdate />
    </div>
  );
};

const EthPriceUpdate = () => {
  // To display the last updated time
  const [lastUpdated, setLastUpdated] = useState(0);

  const incrementLastUpdated = () => {
    setLastUpdated(lastUpdated + 1);
  };

  resetLastUpdated = () => {
    setLastUpdated(0);
  };

  useEffect(() => {
    const timeTick = setInterval(() => {
      incrementLastUpdated();
    }, 1000);
    return () => clearInterval(timeTick);
  });

  return <span className='eth-price-last-update'>({lastUpdated}s ago)</span>;
};

export default EthPrice;
