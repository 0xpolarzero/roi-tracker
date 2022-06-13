import React, { useEffect, useState } from 'react';
import { TimestampConverter } from '../../systems/timestamp';

const EvolutionTable = ({ balance, date }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);

  useEffect(() => {
    setShowDecimals(false);
  }, [balance]);

  const balanceToShow = (balance) => {
    if (showDecimals) {
      return balance;
    }
    return parseFloat(balance).toFixed(4);
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
                className='highlight'
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {balanceToShow(balance.old)}
              </span>
            </td>
            <td>
              <span
                className='highlight'
                onMouseEnter={() => setShowDecimals(true)}
                onMouseLeave={() => setShowDecimals(false)}
              >
                {balanceToShow(balance.new)}
              </span>
            </td>
            <td>roi eth</td>
            <td>evolution eth</td>
          </tr>
          <tr>
            <th scope='row'>$</th>
            <td>balance old $</td>
            <td>balance new $</td>
            <td>roi $</td>
            <td>evolution $</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EvolutionTable;
