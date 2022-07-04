import { useEffect, useState } from 'react';
import Popup from '../Utils/Popup';

import ProgressSpinner from '../Utils/ProgressSpinner';

const TokenList = ({
  tokens,
  displayTokens,
  isTokensLoaded,
  isTokensFetched,
  activeTokens,
  setActiveTokens,
}) => {
  if (!isTokensFetched && isTokensLoaded) {
    return (
      <div className='token-list config'>
        <p>Please refresh to see your tokens.</p>
        <p>
          <button onClick={displayTokens}>Refresh</button>
        </p>
      </div>
    );
  }
  if (!isTokensLoaded) {
    return (
      <div className='token-list loading'>
        <ProgressSpinner />
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className='token-list config'>
        <p>No tokens found.</p>
        <button onClick={displayTokens}>Refresh</button>
      </div>
    );
  }

  return (
    <div className='token-list'>
      {tokens.map((token) => {
        return (
          <Token
            token={token}
            activeTokens={activeTokens}
            setActiveTokens={setActiveTokens}
            key={token.token_address}
          />
        );
      })}
    </div>
  );
};

export default TokenList;

const Token = ({ token, activeTokens, setActiveTokens }) => {
  const [isShownToken, setIsShownToken] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getTokenIcon = (token) => {
    if (token.thumbnail) {
      return <img src={token.thumbnail} alt={token.name} width={48} />;
    }
    return <div className='token-icon-symbol'>{token.symbol}</div>;
  };

  // Dont let the user unselect the token if it's wETH
  const isNotWEth = (token) => {
    return token.token_address !== '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  };

  useEffect(() => {
    if (isSelected) {
      // Just make sure the token is not present in the array already
      if (
        activeTokens.findIndex(
          (b) => b.token_address === token.token_address,
        ) === -1
      ) {
        setActiveTokens([...activeTokens, token]);
      }
    } else {
      setActiveTokens(
        activeTokens.filter((t) => t.token_address !== token.token_address),
      );
    }
  }, [isSelected]);

  // Default select wETH
  useEffect(() => {
    if (token.token_address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
      setIsSelected(true);
    }
  }, []);

  return (
    <div className='token-item'>
      <div
        className={isSelected ? 'token-icon selected' : 'token-icon'}
        onMouseEnter={() => setIsShownToken(true)}
        onMouseLeave={() => setIsShownToken(false)}
        onClick={() => isNotWEth(token) && setIsSelected(!isSelected)}
      >
        {getTokenIcon(token)}
      </div>
      {/* show only this token if it's hovered */}
      {isShownToken && (
        <div
          className='token-info'
          onMouseEnter={() => setIsShownToken(true)}
          onMouseLeave={() => setIsShownToken(false)}
        >
          <div className='token-name'>
            {token.name} ({token.symbol})
          </div>
          {/* <div className='token-address'>{token.token_address}</div> */}
        </div>
      )}
    </div>
  );
};
