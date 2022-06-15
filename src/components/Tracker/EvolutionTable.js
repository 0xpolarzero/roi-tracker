import React, { useEffect, useState } from 'react';
import { TimestampConverter } from '../../systems/timestamp';
import { expandDecimals } from '../../utils/utils';

const EvolutionTable = ({ balance, date, ethPriceValue }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);
  // Set the state of total balance
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    setShowDecimals(false);

    // Calculate the total balance
    const totalStart = sumBalances(balance, 'start');
    const totalEnd = sumBalances(balance, 'end');
    setTotalBalance({ start: totalStart, end: totalEnd });
  }, [balance]);

  const showBalance = (balance, currency) => {
    if (currency === 'eth' || currency === 'weth') {
      return expandDecimals(balance, showDecimals);
    } else {
      return parseFloat(balance * ethPriceValue).toFixed(2);
    }
  };

  const showDifference = (balance, currency) => {
    let difference;
    if (currency === 'eth' || currency === 'weth') {
      difference = expandDecimals(balance.end - balance.start, showDecimals);
    } else {
      difference = `${parseFloat(
        (balance.end - balance.start) * ethPriceValue,
      ).toFixed(2)}`;
    }
    if (difference >= 0) {
      return <span className='value-up'>+{difference}</span>;
    } else {
      return <span className='value-down'>{difference}</span>;
    }
  };

  const sumBalances = (balances, time) => {
    let total = 0;
    for (const currency in balances) {
      if (balances.hasOwnProperty(currency)) {
        total += balances[currency][time];
      }
    }
    return total;
  };

  if (date.from === '') {
    // return;
  }

  return (
    <div className='evolution-table'>
      <table>
        <tbody>
          <tr>
            <th scope='col'>
              <i
                className='show-decimals fa-solid fa-eye'
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              ></i>
            </th>
            <th scope='col'>
              Start balance{' '}
              <span className='unweight'>
                (
                {TimestampConverter()
                  .timestampToDate(date.from)
                  .toLocaleString()}
                )
              </span>
            </th>
            <th scope='col'>
              End balance{' '}
              <span className='unweight'>
                (
                {TimestampConverter().timestampToDate(date.to).toLocaleString()}
                )
              </span>
            </th>
            <th scope='col'>Deposit / Withdraw</th>
            <th scope='col'>ROI</th>
            <th scope='col'>Evolution</th>
          </tr>
          <tr>
            <th scope='row'>ETH</th>
            <td>
              <span>{showBalance(balance.eth.start, 'eth')}</span>
            </td>
            <td>
              <span>{showBalance(balance.eth.end, 'eth')}</span>
            </td>
            <td>in out cash</td>
            <td>
              <span>{showDifference(balance.eth, 'eth')}</span>
            </td>
            <td>evolution eth</td>
          </tr>
          <tr>
            <th scope='row'>WETH</th>
            <td>
              <span>{showBalance(balance.weth.start, 'weth')}</span>
            </td>
            <td>
              <span>{showBalance(balance.weth.end, 'weth')}</span>
            </td>
            <td>in out cash</td>
            <td>
              <span>{showDifference(balance.weth, 'weth')}</span>
            </td>
            <td>evolution eth</td>
          </tr>
          <tr>
            <th scope='row'>
              <span className='highlight'>Total ($)</span>
            </th>
            <td>{showBalance(totalBalance.start, 'currency')}</td>
            <td>{showBalance(totalBalance.end, 'currency')}</td>
            <td>in out cash</td>
            <td>{showDifference(totalBalance)}</td>
            <td>evolution $</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EvolutionTable;
