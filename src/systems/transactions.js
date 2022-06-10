import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import EthDater from 'ethereum-block-by-date';
import { identifyAction } from './abi-identifier';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);
const dater = new EthDater(web3);
const etherscanAPI = process.env.REACT_APP_ETHERSCAN_API_KEY;

async function getTransactions(from, addresses) {
  // Get the transactions from the wallets within time range
  const rawTransactions = await getTransactionsFromWallets(from, addresses);
  // ! Sort the gathered transactions (delete duplicates & TODO Sort them)
  // const sortedTransactions = filterTransactions(rawTransactions);
  // Only keep the necessary fields
  const customTransactionsList = await selectTransactionsData(rawTransactions);
  console.log(customTransactionsList);
}

async function getTransactionsFromWallets(from, addresses) {
  let allTransactions = [];

  // Get the closest block corresponding to the 'from' date
  const startBlock = await dater.getDate(from);

  for (const address of addresses) {
    // Get the transactions from the wallet
    const transactionsFromAddress = await web3.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      fromAddress: address,
    });
    const transactionsFromAddressResult = transactionsFromAddress.transfers;
    // Get the transactions to the wallet
    const transactionsToAddress = await web3.alchemy.getAssetTransfers({
      fromBlock: startBlock.block,
      toAddress: address,
    });
    const transactionsToAddressResult = transactionsToAddress.transfers;

    // Wait a bit to not overload the API limit
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Merge all the transactions
    allTransactions = [
      ...transactionsFromAddressResult,
      ...transactionsToAddressResult,
    ];
  }

  // return filteredTransactions;
  return allTransactions;
}

function filterTransactions(transactions) {
  // Delete the duplicate transactions (if transfer is made between added wallets)
  const filteredTransactions = transactions.filter((transaction, index) => {
    const isDuplicate = transactions.some(
      (transaction2, index2) =>
        index !== index2 && transaction === transaction2,
    );
    return !isDuplicate;
  });

  // ! Need to get the timestamp of transactions to sort them

  return filteredTransactions;
}

async function selectTransactionsData(transactions) {
  // Only keep the necessary fields
  const customTransactionsList = await transactions.map(async (transaction) => {
    // Get the gas price of this transaction
    const data = await web3.eth.getTransactionReceipt(transaction.hash);
    const gasFee = data.effectiveGasPrice * data.gasUsed;

    // TODO Handle different objects based on transaction.category
    return {
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value,
      asset: transaction.asset,
      gasFee: gasFee,
    };
  });

  // Only return when promise is resolved
  return Promise.all(customTransactionsList).catch((err) => {
    console.log(err);
  });
}

// async function identifySignature(signature) {
//   // Get the signature from the transaction
//   const signatureData = signature.substring(0, 10);
//   const action = await fetchText(
//     `https://raw.githubusercontent.com/polar0/4bytes/master/signatures/${signatureData}`,
//   );

//   return action;
// }

const isValidAddress = (address) => {
  const isValid = web3.utils.isAddress(address);
  return isValid;
};

export { getTransactions, isValidAddress };
