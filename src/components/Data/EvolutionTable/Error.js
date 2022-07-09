import { Content } from 'antd/lib/layout/layout';
import { useState, useEffect } from 'react';

const Error = ({ balance }) => {
  const [errorMessage, setErrorMessage] = useState([]);
  const [isShownError, setIsShownError] = useState(false);

  useEffect(() => {
    // Display an error if a token price could not be converted to ETH because NaN
    if (
      (balance.start.eth !== undefined && isNaN(balance.start.eth)) ||
      (balance.end.eth !== undefined && isNaN(balance.end.eth))
    ) {
      setErrorMessage([
        {
          message:
            'We could not get the price of this token in ETH. Please contact us if you believe this is an error.',
          key: 'EthPriceConversion',
        },
      ]);
    }
  }, [balance]);

  return (
    <div className='error'>
      <div
        className='error-message-icon'
        onMouseEnter={() => setIsShownError(true)}
        onMouseLeave={() => setIsShownError(false)}
      >
        {errorMessage.length > 0 && (
          <i className='fa-solid fa-circle-exclamation'></i>
        )}
      </div>
      {isShownError && (
        <div className='error-message-content'>
          {errorMessage.map((error) => (
            <p key={error.key}>{error.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Error;
