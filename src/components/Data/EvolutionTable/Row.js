import React from 'react';

import Error from './Error';
import Difference from './Difference';
import { expandDecimals } from '../../../systems/utils';

const Row = ({ category, balance, showDecimals, ethPriceValue, ...token }) => {
  const displayName = (category) => {
    switch (category) {
      case 'eth':
        return 'ETH';
      case 'total':
        return <span className='highlight'>Total</span>;
      default:
        return token.name ? `${token.name} (${token.symbol})` : 'Unknown token';
    }
  };

  const displayBalance = (amount) => {
    if (category === 'eth') {
      return `${expandDecimals(amount, showDecimals)} Ξ`;
    } else if (category === 'total') {
      return (
        <div>
          <div className='highlight'>
            $ {(amount * ethPriceValue).toFixed(2)}
          </div>
          <div className='minify'>{expandDecimals(amount, showDecimals)} Ξ</div>
        </div>
      );
    } else {
      let resultInEth;
      if (typeof amount === 'object' && amount.eth.hasOwnProperty('error')) {
        resultInEth = '??';
      } else {
        resultInEth = amount.eth;
      }
      return (
        <div>
          {amount.native} {token.symbol}
          <div className='minify'>({resultInEth} ETH)</div>
        </div>
      );
    }
  };

  const displayEvolution = (amount) => {
    let factor;

    // Prevent from dividing by 0
    // if (
    //   (category !== 'token' && amount.start === 0 && amount.end !== 0) ||
    //   (amount.start.native === 0 && amount.end.native !== 0)
    // )
    //   return '💀';

    // If the balance is 0, the evolution is 0
    if (
      (category !== 'token' && amount.start === 0) ||
      amount.end.native === 0
    ) {
      factor = 'No evolution';
    } else if (category === 'eth') {
      factor = expandDecimals(amount.end / amount.start);
    } else if (category === 'total') {
      factor = parseFloat(amount.end / amount.start);
    } else {
      factor = amount.end.native / amount.start.native;
    }
    if (factor >= 1) {
      return <span className='value-up'>×{Number(factor.toFixed(2))}</span>;
    } else if (factor < 1) {
      return <span className='value-down'>×{Number(factor.toFixed(2))}</span>;
    } else {
      return <span className='value-none'>{factor}</span>;
    }
  };

  return (
    <tr>
      <th scope='row'>
        {displayName(category)} <Error balance={balance} />
      </th>
      <td>
        <div className='row-balance'>
          <div>{displayBalance(balance.start)}</div>
        </div>
      </td>
      <td>
        <div className='row-balance'>
          <div>{displayBalance(balance.end)}</div>
        </div>
      </td>
      <td>
        <Difference
          balance={balance}
          category={category}
          showDecimals={showDecimals}
          ethPriceValue={ethPriceValue}
          tokenSymbol={token.symbol}
        />
      </td>
      <td>{displayEvolution(balance, 'eth')}</td>
    </tr>
  );
};

export default Row;
