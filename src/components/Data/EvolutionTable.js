import React, { useEffect, useState } from 'react';
import { TimestampConverter } from '../../systems/timestamp';
import { expandDecimals } from '../../systems/utils';

const EvolutionTable = ({ balance, date, ethPriceValue }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);
  // Set the state of total balance
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    console.log(balance);
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

  const sumBalances = (balances, time) => {
    let total = 0;
    for (const currency in balances) {
      if (balances.hasOwnProperty(currency)) {
        total += balances[currency][time];
      }
    }
    return total;
  };

  const showDifference = (balance, currency) => {
    let difference;

    if (currency === 'eth') {
      difference = expandDecimals(
        balance.eth.end +
          balance.weth.end -
          (balance.eth.start + balance.weth.start),
        showDecimals,
      );
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

  const showEvolution = (balance, currency) => {
    let factor;

    // Prevent from dividing by 0
    if (balance.end === 0) return '💀';

    if (currency === 'eth') {
      factor = expandDecimals(
        (balance.eth.end + balance.weth.end) /
          (balance.eth.start + balance.weth.start),
      );
    } else {
      factor = parseFloat(balance.end / balance.start);
    }
    if (factor >= 1) {
      return <span className='value-up'>×{Number(factor.toFixed(2))}</span>;
    } else {
      return <span className='value-down'>×{Number(factor.toFixed(2))}</span>;
    }
  };

  return (
    <div className='evolution-table'>
      <div className='header'>
        <div className='title'>
          <i className='config-icon fa-solid fa-chart-line'></i>Evolution
        </div>
      </div>
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
            <th scope='col'>ROI</th>
            <th scope='col'>Evolution</th>
          </tr>
          <tr>
            <th scope='row'>ETH</th>
            <td>
              <div className='eth-balance'>
                <div>
                  {showBalance(balance.eth.start + balance.weth.start, 'eth')}
                </div>
                <div className='minify'>
                  (<i className='fa-brands fa-ethereum'></i>{' '}
                  {showBalance(balance.eth.start, 'eth')} +{' '}
                  <i className='fa-brands fa-ethereum weth'></i>{' '}
                  {showBalance(balance.weth.start, 'eth')})
                </div>
              </div>
            </td>
            <td>
              <div className='eth-balance'>
                <div>
                  {showBalance(balance.eth.end + balance.weth.end, 'eth')}
                </div>
                <div className='minify'>
                  {' '}
                  (<i className='fa-brands fa-ethereum'></i>{' '}
                  {showBalance(balance.eth.end, 'eth')} +{' '}
                  <i className='fa-brands fa-ethereum weth'></i>{' '}
                  {showBalance(balance.weth.end, 'eth')})
                </div>
              </div>
            </td>
            <td>
              <span className='eth-diff'>{showDifference(balance, 'eth')}</span>
            </td>
            <td>{showEvolution(balance, 'eth')}</td>
          </tr>
          <tr>
            <th scope='row'>other</th>
            <td>
              <span>start</span>
            </td>
            <td>
              <span>end</span>
            </td>
            <td>
              <span>roi</span>
            </td>
            <td>evolution</td>
          </tr>
          <tr>
            <th scope='row'>
              <span className='highlight'>Total ($)</span>
            </th>
            <td>{showBalance(totalBalance.start, 'currency')}</td>
            <td>{showBalance(totalBalance.end, 'currency')}</td>
            <td>{showDifference(totalBalance)}</td>
            <td>{showEvolution(totalBalance, 'currency')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EvolutionTable;
