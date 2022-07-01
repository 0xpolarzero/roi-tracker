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

async function getTokenBalance(
  provider,
  Web3Api,
  block,
  walletAddresses,
  token,
) {
  let tokenBalance = { native: 0, eth: 0 };

  const contract = new provider.eth.Contract(minABI, token.token_address);

  for (const address of walletAddresses) {
    let localBalance = {};

    const tokenBalanceFromAddress = await contract.methods
      .balanceOf(address)
      .call(null, block);

    localBalance.native = tokenBalanceFromAddress;

    // If it's wETH address
    if (
      token.token_address.toLowerCase() ===
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'.toLowerCase()
    ) {
      localBalance.eth = tokenBalanceFromAddress;
    } else {
      localBalance.eth = await getTokenBalanceInEth(
        Web3Api,
        token.token_address,
        tokenBalanceFromAddress,
        token.name,
      );
    }

    tokenBalance.native += Number(localBalance.native);
    tokenBalance.eth += Number(localBalance.eth);
  }

  // // Format balance in ether
  // const formatted = provider.utils.fromWei(tokenBalanceFromAddress, 'ether');
  // balancesCombined += Number(formatted);
  return tokenBalance;
}

async function getTokenBalanceInEth(
  Web3Api,
  tokenAddress,
  tokenBalance,
  tokenName,
) {
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
    });

  const tokenBalanceInEth = tokenBalance * price;

  return tokenBalanceInEth;
}

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

/* const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]; */

const isValidAddress = (provider, address) => {
  const isValid = provider.utils.isAddress(address);
  return isValid;
};

export { getEthBalance, getTokenBalance, isValidAddress };
