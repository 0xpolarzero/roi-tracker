import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { fetchData, fetchText } from './utils';
import { identifyAction } from './abi-identifier';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);
const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;

async function getTransactions(from, addresses) {
  // Get the transactions from the wallets within time range
  const rawTransactions = await getTransactionsFromWallets(from, addresses);
  // Sort the gathered transactions (most recent first & delete duplicates)
  const sortedTransactions = sortTransactions(rawTransactions);
  // Only keep the necessary fields
  const customTransactionsList = await selectTransactionsData(
    sortedTransactions,
  );

  console.log(customTransactionsList);
}

async function getTransactionsFromWallets(from, addresses) {
  let transactions = [];
  for (const address of addresses) {
    const totalTransactions = await fetchData(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${etherscanAPI}`,
    );
    const totalTransactionsArray = totalTransactions.result;
    // Only keep transactions that are within the period
    const filteredTransactions = totalTransactionsArray.filter(
      (transaction) => {
        const isValid = new Date(transaction.timeStamp * 1000) > from;
        return isValid;
      },
    );
    // Push each transactions to the main array (without specifying the address)
    for (const transaction of filteredTransactions) {
      transactions.push(transaction);
    }
  }

  return transactions;
}

function sortTransactions(transactions) {
  // Sort the transactions by timestamp (get the most recent first)
  transactions.sort((a, b) => {
    return b.timeStamp - a.timeStamp;
  });
  // Delete the duplicate transactions if they have the same hash
  const uniqueTransactions = transactions.filter((transaction, index) => {
    const isUnique =
      transactions.findIndex((t) => t.hash === transaction.hash) === index;
    return isUnique;
  });

  return uniqueTransactions;
}

async function selectTransactionsData(transactions) {
  // Only keep the necessary fields
  const customTransactionsList = await transactions.map((transaction) => {
    return {
      hash: transaction.hash,
      timestamp: transaction.timeStamp,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value,
      gasFee: transaction.gasPrice * transaction.gasUsed,
      action: identifyAction(transaction),
    };
  });

  return customTransactionsList;
}

async function identifySignature(signature) {
  // Get the signature from the transaction
  const signatureData = signature.substring(0, 10);
  const action = await fetchText(
    `https://raw.githubusercontent.com/polar0/4bytes/master/signatures/${signatureData}`,
  );

  return action;
}

const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getTransactions, isValidAddress };
