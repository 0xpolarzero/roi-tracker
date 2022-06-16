import React, { useEffect, useState } from 'react';

const ExchangesData = ({ deposits, totalDepositValue }) => {
  return (
    <div className='exchanges-data'>
      <div className='show-deposits'>
        <span className='hint'>Deposits</span>
        {totalDepositValue}
      </div>
    </div>
  );
};

export default ExchangesData;
