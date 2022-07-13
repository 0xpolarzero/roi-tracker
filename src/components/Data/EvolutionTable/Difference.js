import { useState } from 'react';

import { expandDecimals } from '../../../systems/utils';

const Difference = ({
  balance,
  category,
  showDecimals,
  ethPriceValue,
  tokenSymbol,
}) => {
  const showDifference = (amount) => {
    let isDiffUp;
    if (category === 'eth' || category === 'total') {
      amount.end >= amount.start ? (isDiffUp = true) : (isDiffUp = false);
    } else {
      amount.end.native >= amount.start.native
        ? (isDiffUp = true)
        : (isDiffUp = false);
    }
    let result;
    const sign = isDiffUp ? '+' : '';

    if (category === 'eth') {
      result = sign + expandDecimals(amount.end - amount.start, showDecimals);
    } else if (category === 'total') {
      result = (
        <span>
          <div className='highlight'>
            {sign + ((amount.end - amount.start) * ethPriceValue).toFixed(2)} $
          </div>
          <div className='minify'>
            {sign + expandDecimals(amount.end - amount.start, showDecimals)} Ξ
          </div>
        </span>
      );
    } else {
      let resultInEth;

      if (
        amount.end.eth.hasOwnProperty('error') ||
        amount.start.eth.hasOwnProperty('error')
      ) {
        resultInEth = '??';
      } else {
        resultInEth = amount.end.eth - amount.start.eth;
      }
      result = (
        <span>
          {sign + amount.end.native - amount.start.native} {tokenSymbol}
          {<div className='minify'>({sign + resultInEth} ETH)</div>}
        </span>
      );
    }

    if (isDiffUp) {
      return <span className='value-up'>{result}</span>;
    } else {
      return <span className='value-down'>{result}</span>;
    }
  };

  return (
    <span className={category === 'eth' ? 'eth-diff' : 'diff'}>
      {showDifference(balance)}
    </span>
  );
};

export default Difference;
