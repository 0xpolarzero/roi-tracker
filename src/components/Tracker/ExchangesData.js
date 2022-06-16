import React, { useEffect, useState } from 'react';

const ExchangesData = ({ deposits }) => {
  const showDeposits = (asset) => {
    if (deposits.length === 0 || deposits === 0) {
      return 'No deposits';
    }

    // Find each deposit corresponding to this asset
    const depositsOfAsset = deposits.filter((deposit) => {
      return deposit.asset === asset;
    });
    if (depositsOfAsset.length === 0) {
      return 'No deposits';
    }

    const totalDeposit = sumDeposits(depositsOfAsset);

    if (totalDeposit >= 0) {
      return <span className='value-up'>+{totalDeposit}</span>;
    } else {
      return <span className='value-down'>{totalDeposit}</span>;
    }
  };

  const sumDeposits = (deposits) => {
    let total = 0;
    for (const deposit of deposits) {
      total += deposit.value;
    }
    return total;
  };

  return (
    <div className='exchanges-data'>
      <div className='show-deposits'>
        <span className='hint'>Deposits</span>
        {showDeposits('ETH')}
      </div>
    </div>
  );
};

export default ExchangesData;
