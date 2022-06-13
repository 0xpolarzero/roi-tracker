import React, { useEffect, useState } from 'react';
import { TimestampConverter } from '../../systems/timestamp';
import { expandDecimals } from '../../systems/utils';

const EvolutionTable = ({ balance, date, ethPriceValue }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);
  let balanceInCurrency = {};

  useEffect(() => {
    setShowDecimals(false);
  }, [balance]);

  const showBalance = (balance, currency) => {
    if (currency === 'eth') {
      return expandDecimals(balance, showDecimals);
    } else {
      return `${parseFloat(balance * ethPriceValue).toFixed(2)}`;
    }
  };

  const showDifference = (balance, currency) => {
    let difference;
    if (currency === 'eth') {
      difference = expandDecimals(balance.new - balance.old, showDecimals);
    } else {
      difference = `${parseFloat(
        (balance.new - balance.old) * ethPriceValue,
      ).toFixed(2)}`;
    }
    if (difference >= 0) {
      return <span className='value-up'>+{difference}</span>;
    } else {
      return <span className='value-down'>{difference}</span>;
    }
  };

  if (date.from === '') {
    // return;
  }

  return (
    <div className='evolution-table'>
      <table>
        <tbody>
          <tr>
            <th scope='col'></th>
            <th scope='col'>
              Old balance{' '}
              <span className='unweight'>
                (
                {TimestampConverter()
                  .timestampToDate(date.from)
                  .toLocaleString()}
                )
              </span>
            </th>
            <th scope='col'>
              Current balance{' '}
              <span className='unweight'>
                (
                {TimestampConverter().timestampToDate(date.to).toLocaleString()}
                )
              </span>
            </th>
            <th scope='col'>ROI</th>
            <th scope='col'>Evolution</th>
          </tr>
          <tr>
            <th scope='row'>Eth</th>
            <td>
              <span
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {showBalance(balance.old, 'eth')}
              </span>
            </td>
            <td>
              <span
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {showBalance(balance.new, 'eth')}
              </span>
            </td>
            <td>
              <span
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {showDifference(balance, 'eth')}
              </span>
            </td>
            <td>evolution eth</td>
          </tr>
          <tr>
            <th scope='row'>$</th>
            <td>{showBalance(balance.old, 'tangible')}</td>
            <td>{showBalance(balance.new, 'tangible')}</td>
            <td>{showDifference(balance, 'tangible')}</td>
            <td>evolution $</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EvolutionTable;
