import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { fetchData } from './utils';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;

async function getTransactions(from, addresses) {
  let transactions = {};
  for (const address of addresses) {
    const totalTransactions = await fetchData(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${etherscanAPI}`,
    );
    const totalTransactionsArray = totalTransactions.result;
    const filteredTransactions = totalTransactionsArray.filter(
      (transaction) => {
        const isValid = new Date(transaction.timeStamp * 1000) > from;
        return isValid;
      },
    );
    transactions[address] = filteredTransactions;
  }

  return transactions;
}

const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getTransactions, isValidAddress };
