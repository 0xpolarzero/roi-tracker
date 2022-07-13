import { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import EthDater from 'ethereum-block-by-date';

import { TimestampConverter } from '../../systems/timestamp';
import Popup from '../Utils/Popup';
import TokenList from '../Data/TokenList';
import { displayNotif } from '../../systems/utils';

const TokensConfig = ({ dater, addresses, activeTokens, setActiveTokens }) => {
  const Web3Api = useMoralisWeb3Api();

  const [tokens, setTokens] = useState([]);
  const [isTokensLoaded, setIsTokensLoaded] = useState(false);
  const [isTokensFetched, setIsTokensFetched] = useState(false);

  const displayTokens = async () => {
    setIsTokensLoaded(false);

    const blocks = await getBlocks();

    const rawTokens = await getTokens(blocks);

    // If there are multiple tokens with the same address, only keep one
    const uniqueTokens = rawTokens.reduce((acc, token) => {
      if (!acc.find((t) => t.token_address === token.token_address)) {
        acc.push(token);
      }
      return acc;
    }, []);

    setTokens(uniqueTokens);
    setIsTokensLoaded(true);
  };

  const getBlocks = async () => {
    const lastMonth = await dater.getDate(TimestampConverter().lastMonth());
    const now = await dater.getDate(TimestampConverter().now());

    return { start: lastMonth.block, end: now.block };
  };

  const getTokens = async (blocks) => {
    let localTokens = [];

    for (const address of addresses) {
      try {
        const tokensAtStart = await Web3Api.account.getTokenBalances({
          address: address,
          to_block: blocks.start,
        });
        const tokensAtEnd = await Web3Api.account.getTokenBalances({
          address: address,
          to_block: blocks.end,
        });
        localTokens = [...localTokens, ...tokensAtStart, ...tokensAtEnd];
        setIsTokensFetched(true);
      } catch (error) {
        console.log(error);
        displayNotif(
          'error',
          'Error while fetching tokens. Please try to refresh with the button.',
          5000,
        );
        setIsTokensFetched(false);
      }
    }

    // Keep wETH first
    const sortedTokens = sortTokens(localTokens);

    return sortedTokens;
  };

  const sortTokens = (tokens) => {
    tokens.sort((a, b) => {
      if (a.token_address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
        return -1;
      }
      if (b.token_address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
        return 1;
      }
      return 0;
    });

    return tokens;
  };

  const showHelp = () => {
    Popup.display(
      [
        `You can include ERC20 tokens you held in one of your wallets during the last 30 days.`,
        `ETH and wETH are always included`,
      ],
      '.fa-circle-info',
    );
  };

  const hideHelp = () => {
    Popup.hide('#popup');
  };

  useEffect(() => {
    displayTokens();
  }, [addresses]);

  return (
    <div className='card token-config config-item'>
      <div className='header'>
        <div className='title'>
          <i className='config-icon fa-solid fa-coins'></i>Tokens
          <i
            className='token-help fa-solid fa-circle-info'
            onMouseEnter={showHelp}
            onMouseLeave={hideHelp}
          ></i>
        </div>
        <div className='buttons'>
          <button className='select-tokens-all-btn'>All</button>
          <button className='select-tokens-min-btn'>Minimum</button>
        </div>
      </div>
      <input
        type='text'
        name='add-token-manual'
        id='add-token-manual'
        placeholder='Search a token in your wallet'
      />
      <div className='wrapper'>
        <TokenList
          tokens={tokens}
          displayTokens={displayTokens}
          isTokensLoaded={isTokensLoaded}
          isTokensFetched={isTokensFetched}
          activeTokens={activeTokens}
          setActiveTokens={setActiveTokens}
        />
      </div>
    </div>
  );
};

export default TokensConfig;
