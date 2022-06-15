import React, { useEffect, useState } from 'react';
import { TimestampConverter } from '../../systems/timestamp';
import { expandDecimals } from '../../utils/utils';

const EvolutionTable = ({ balance, date, ethPriceValue }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);

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
            <th scope='row'>Eth</th>
            <td>
              <span
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {showBalance(balance.start, 'eth')}
              </span>
            </td>
            <td>
              <span
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {showBalance(balance.end, 'eth')}
              </span>
            </td>
            <td>in out cash</td>
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
            <td>{showBalance(balance.start, 'tangible')}</td>
            <td>{showBalance(balance.end, 'tangible')}</td>
            <td>in out cash</td>
            <td>{showDifference(balance, 'tangible')}</td>
            <td>evolution $</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EvolutionTable;
