import { useState } from 'react';

import { expandDecimals } from '../../../systems/utils';

const Difference = ({
  balance,
  category,
  showDecimals,
  ethPriceValue,
  tokenSymbol,
}) => {
  //   const [isDiffUp, setIsDiffUp] = useState(false);

  const showDifference = (amount) => {
    let isDiffUp;
    amount.end > amount.start ? (isDiffUp = true) : (isDiffUp = false);
    let result;
    const sign = isDiffUp ? '+' : '';

    // amount.end > amount.start ? setIsDiffUp(true) : setIsDiffUp(true);

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
      result = (
        <span>
          {sign + amount.end.native - amount.start.native} {tokenSymbol}
          {
            <div className='minify'>
              ({sign + amount.end.eth - amount.start.eth} ETH)
            </div>
          }
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
