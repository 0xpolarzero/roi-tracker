import { getLocalExchangeList } from './fetch-etherscan';

const getDeposits = async (provider, addresses, block) => {
  // Get all transactions received by this address during this period
  const transactions = await getTransactions(provider, addresses, block);
  // Get a list of addresses owned by major exchanges
  const exchangesList = await getExchangeAddresses();
  // Keep only transactions sent by these exchanges
  const filteredTransactions = filterTransactions(transactions, exchangesList);

  return filteredTransactions;
};

const getTransactions = async (provider, addresses, block) => {
  let totalTransactions = [];

  for (const address of addresses) {
    const transactions = await provider.alchemy.getAssetTransfers({
      toAddress: address,
      fromBlock: block.start,
      toBlock: block.end,
    });
    totalTransactions = [...totalTransactions, ...transactions.transfers];
  }

  return totalTransactions;
};

const getExchangeAddresses = async () => {
  const exchangeList = await getLocalExchangeList();
  // For each exchange, get its address and its tag in an object
  const exchanges = exchangeList.map((exchange) => {
    return {
      address: exchange.address,
      tag: exchange.tag,
    };
  });

  return exchanges;
};

const filterTransactions = (transactions, exchanges) => {
  const filteredTransactions = transactions.filter((transaction) => {
    // Keep the transaction if an object in exchangesList has the same address as the transaction sender
    const isExchange = exchanges.some((exchange) => {
      return exchange.address === transaction.from;
    });

    // Find the exchange that sent this transaction and add its tag to the transaction
    isExchange &&
      (transaction.exchange = exchanges.find(
        (exchange) => exchange.address === transaction.from,
      ).tag);

    return isExchange;
  });

  return filteredTransactions;
};

export { getDeposits };
