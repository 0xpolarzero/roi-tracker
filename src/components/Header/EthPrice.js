import React, { useEffect, useState } from 'react';
import { fetchData } from '../../systems/utils';

let resetLastUpdated;

const EthPrice = () => {
  const [price, setPrice] = useState(0);

  const updatePrice = async () => {
    const data = await fetchData(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    );
    setPrice(data.ethereum.usd);
    resetLastUpdated();
  };

  useEffect(() => {
    updatePrice();
    const priceTick = setInterval(() => {
      updatePrice();
    }, 10000);

    return () => clearInterval(priceTick);
  });

  return (
    <div className='eth-price'>
      {/* <span>1 </span> */}
      <i className='eth-price-label fa-brands fa-ethereum'></i>
      <span className='eth-price-value'>${price}</span>
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
