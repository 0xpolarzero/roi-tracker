import { getExchangeAddresses } from './exchanges/exchanges';
import { TimestampConverter } from './timestamp';

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

async function getTokenBalance(provider, block, walletAddresses, tokenAddress) {
  let balancesCombined = 0;

  const contract = new provider.eth.Contract(minABI, tokenAddress);

  for (const address of walletAddresses) {
    const tokenBalanceFromAddress = await contract.methods
      .balanceOf(address)
      .call(null, block);
    // Format balance in ether
    const formatted = provider.utils.fromWei(tokenBalanceFromAddress, 'ether');
    balancesCombined += Number(formatted);
  }

  return balancesCombined;
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

const isValidAddress = (provider, address) => {
  const isValid = provider.utils.isAddress(address);
  return isValid;
};

export { getEthBalance, getTokenBalance, isValidAddress };
