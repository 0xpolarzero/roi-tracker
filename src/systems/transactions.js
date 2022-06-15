import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import EthDater from 'ethereum-block-by-date';
import { getExchangeAddresses } from './exchanges';
import { TimestampConverter } from './timestamp';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);
const dater = new EthDater(web3);

async function getBalanceDiff(from, to, addresses) {
  // Get the closest block corresponding to the 'from' date
  const startBlock = await dater.getDate(from);
  // Get the addresses balance at the start of the period
  const startBalance = await getBalances(startBlock.block, addresses);

  let endBalance;
  // Get the closest block corresponding to the 'to' date

  if (to === TimestampConverter().now()) {
    endBalance = await getBalances('latest', addresses);
  } else {
    const endBlock = await dater.getDate(to);
    endBalance = await getBalances(endBlock.block, addresses);
  }

  return { start: startBalance, end: endBalance };
}

async function getBalances(block, addresses) {
  let balancesCombined = 0;

  for (const address of addresses) {
    const balanceFromAddress = await web3.eth
      .getBalance(address.toString(), block)
      .catch((err) => {
        console.log(err);
      });
    const formatted = web3.utils.fromWei(balanceFromAddress, 'ether');
    balancesCombined += Number(formatted);
  }

  return balancesCombined;
}

const getTransactions = async (address, block) => {
  // Get a list of transactions made by this address during this period
  const transactions = await web3.alchemy.getAssetTransfers({
    fromAddress: address,
    fromBlock: block,
  });

  // Get the addresses of all major cryptocurrency exchanges
  const exchanges = await getExchangeAddresses();
};
const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getBalanceDiff, isValidAddress };
