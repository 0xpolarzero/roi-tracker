import React, { useEffect, useState } from 'react';

const ExchangesData = ({ deposits, totalDepositValue }) => {
  const displayDeposits = () => {
    console.log(deposits);
    if (deposits.length === 0) {
      return <div className='deposits'>No deposits</div>;
    }

    return deposits.map((deposit) => {
      return (
        <div className='deposit' key={deposit.id}>
          <span className='deposit-name'>{deposit.value.toFixed(3)}</span>{' '}
          <span className='deposit-value'>{deposit.asset}</span> from{' '}
          {deposit.exchange}
        </div>
      );
    });
  };

  return (
    <div className='exchanges-data'>
      <div className='show-deposits'>
        <div className='show-deposits-global'>
          <div className='hint'>Deposits</div>
          <div className='highlight'>{totalDepositValue} ETH</div>
        </div>
        <div className='show-deposits-exchanges'>{displayDeposits()}</div>
      </div>
    </div>
  );
};

export default ExchangesData;
