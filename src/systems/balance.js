import { getExchangeAddresses } from './exchanges/exchanges';
import { TimestampConverter } from './timestamp';
import { displayNotif, fetchData } from './utils';

// const tokenSource = 'https://tokens.coingecko.com/uniswap/all.json';
// https://solveforum.com/forums/threads/solved-get-token-balance-of-address-at-particular-block-number-with-alchemy.609041/

async function getEthBalance(provider, block, addresses) {
  let balancesCombined = 0;

  for (const address of addresses) {
    const balanceFromAddress = await provider.eth
      .getBalance(address.toString(), block)
      .catch((err) => {
        console.log(err);
      });
    const formatted = provider.utils.fromWei(balanceFromAddress, 'ether');
    balancesCombined += Number(formatted);
  }

  return balancesCombined;
}

const gatherTokenBalance = async (
  Web3Api,
  startBlock,
  endBlock,
  walletAddresses,
  tokens,
  setLoadingProgress,
) => {
  if (!tokens) return null;

  const startBalance = await getTokenBalance(
    Web3Api,
    startBlock,
    walletAddresses,
    tokens,
    'start',
  );

  setLoadingProgress({ progress: 65 });

  const endBalance = await getTokenBalance(
    Web3Api,
    endBlock,
    walletAddresses,
    tokens,
    'end',
  );

  setLoadingProgress({ progress: 70 });

  // Combine these start end end balances by matching token addresses
  const combinedBalance = startBalance.map((token) => {
    const endToken = endBalance.find((t) => t.address === token.address);
    if (endToken) {
      token.balance.end = endToken.balance.end;
    }
    return token;
  });

  // Get the price of each token in eth and calculate the balance
  for (const token of combinedBalance) {
    getTokenBalanceInEth(Web3Api, token.address, token.balance, token.name);
  }

  return combinedBalance;
};

async function getTokenBalance(
  Web3Api,
  block,
  walletAddresses,
  selectedTokens,
  status,
) {
  let tokenBalancesInWallets = {};
  let tokenBalancesToTrack = [];

  for (const address of walletAddresses) {
    const tokenBalance = await Web3Api.account.getTokenBalances({
      address: address,
      to_block: block,
    });

    tokenBalancesInWallets[address] = tokenBalance;
  }

  for (const token of selectedTokens) {
    const tokenData = {
      address: token.token_address,
      name: token.name,
      symbol: token.symbol,
      balance: {},
    };
    tokenData.balance[status] = { native: 0, eth: 0 };

    for (const wallet in tokenBalancesInWallets) {
      tokenBalancesInWallets[wallet].forEach(async (tokenBalance) => {
        if (tokenBalance.token_address === token.token_address) {
          tokenData.balance[status].native += Number(tokenBalance.balance);
        }
      });
    }

    tokenBalancesToTrack.push(tokenData);
  }

  return tokenBalancesToTrack;
}

async function getTokenBalanceInEth(
  Web3Api,
  tokenAddress,
  tokenBalance,
  tokenName,
) {
  // If it's wETH address
  if (
    tokenAddress.toLowerCase() ===
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase()
  ) {
    tokenBalance.start.eth += Number(tokenBalance.start.native);
    tokenBalance.end.eth += Number(tokenBalance.end.native);
  } else {
    const price = await fetchPriceInEth(
      Web3Api,
      tokenAddress,
      tokenBalance,
      tokenName,
    );

    if (price.error) {
      tokenBalance.start.eth = price;
      tokenBalance.end.eth = price;
    } else {
      const factor = price.nativePrice.value * 1e-18;
      tokenBalance.start.eth = factor * tokenBalance.start.native;
      tokenBalance.end.eth = factor * tokenBalance.end.native;
    }
  }
}

async function fetchPriceInEth(Web3Api, tokenAddress, tokenBalance, tokenName) {
  const price = await Web3Api.token
    .getTokenPrice({
      address: tokenAddress,
      chain: 'eth',
      exchange: 'uniswap-v3',
    })
    .catch((err) => {
      console.log(err);
      displayNotif(
        'error',
        `Could not get requested data for ${tokenName}. Please check the console for the full error message.`,
        6000,
      );

      return { error: err.message };
    });

  return price;
}

const isValidAddress = (provider, address) => {
  const isValid = provider.utils.isAddress(address);
  return isValid;
};

export { getEthBalance, gatherTokenBalance, isValidAddress };
