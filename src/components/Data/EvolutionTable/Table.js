import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import Row from './Row';
import RowSkeleton from './RowSkeleton';

import { TimestampConverter } from '../../../systems/timestamp';

const Table = ({ balance, date, ethPriceValue, loading }) => {
  // Set the state for showing or not the decimals (on hover)
  const [showDecimals, setShowDecimals] = useState(false);
  // Set the state of total balance
  const [totalBalance, setTotalBalance] = useState({ start: 0, end: 0 });

  const sumBalances = (key) => {
    let total = 0;

    total += balance.eth[key];

    if (balance.token.length > 0) {
      for (const token in balance.token) {
        if (balance.hasOwnProperty(token)) {
          total += balance.token[key].eth;
        }
      }
    }
    return total;
  };

  useEffect(() => {
    setShowDecimals(false);

    // Calculate the total balance
    const totalStart = sumBalances('start');
    const totalEnd = sumBalances('end');
    setTotalBalance({ start: totalStart, end: totalEnd });
  }, [balance]);

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
          {loading ? (
            <RowSkeleton />
          ) : (
            <Row
              category='eth'
              balance={balance.eth}
              showDecimals={showDecimals}
              ethPriceValue={ethPriceValue}
            />
          )}

          {balance.token &&
            balance.token.map((x) =>
              loading ? (
                <RowSkeleton key={x.address} />
              ) : (
                <Row
                  category='token'
                  balance={x.balance}
                  showDecimals={showDecimals}
                  ethPriceValue={ethPriceValue}
                  name={x.name}
                  symbol={x.symbol}
                  key={x.address}
                />
              ),
            )}
          {loading ? (
            <RowSkeleton />
          ) : (
            <Row
              category='total'
              balance={totalBalance}
              showDecimals={showDecimals}
              ethPriceValue={ethPriceValue}
            />
          )}
          {/* <tr>
            <th scope='row'>
              <span className='highlight'>Total ($)</span>
            </th>
            <td>{showBalance(totalBalance.start, 'currency')}</td>
            <td>{showBalance(totalBalance.end, 'currency')}</td>
            <td>{showDifference(totalBalance)}</td>
            <td>{showEvolution(totalBalance, 'currency')}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
