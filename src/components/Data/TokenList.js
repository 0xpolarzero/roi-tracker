import { useEffect, useState } from 'react';
import Popup from '../Utils/Popup';

import ProgressSpinner from '../Utils/ProgressSpinner';

const TokenList = ({ tokens, isTokensLoaded, setActiveTokens }) => {
  const [selectedTokens, setSelectedTokens] = useState([]);

  const showTokenInfo = (token) => {
    //
  };

  const hideTokenInfo = () => {
    //
  };

  if (!isTokensLoaded) {
    return (
      <div className='token-list loading'>
        <ProgressSpinner />
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className='token-list'>
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <div className='token-list'>
      {tokens.map((token) => {
        return (
          <Token
            token={token}
            setSelectedTokens={setSelectedTokens}
            key={token.token_address}
          />
        );
      })}
    </div>
  );
};

export default TokenList;

const Token = ({ token, setSelectedTokens }) => {
  const [isShownToken, setIsShownToken] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getTokenIcon = (token) => {
    if (token.thumbnail) {
      return <img src={token.thumbnail} alt={token.name} width={48} />;
    }
    return <div className='token-icon-symbol'>{token.symbol}</div>;
  };

  useEffect(() => {
    // if is selected set selected
  }, [isSelected]);

  return (
    <div className='token-item'>
      <div
        className='token-icon'
        onMouseEnter={() => setIsShownToken(true)}
        onMouseLeave={() => setIsShownToken(false)}
        onClick={() => setIsSelected(!isSelected)}
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
          <div className='token-name'>{token.name}</div>
          <div className='token-address'>{token.token_address}</div>
        </div>
      )}
    </div>
  );
};
